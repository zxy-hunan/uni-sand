<template>
  <view
    class="page l-hello-wrap"
    :style="{
      visibility: visibility,
      height: onlyTimer ? '100%' : '100vh',
    }"
  >
    <view
      class="progress"
      :class="[showProgress ? 'circle-card' : '', type]"
      :style="[progressStyle]"
      v-if="showProgress"
    >
      <view
        class="pr"
        :class="[type == 'circle' ? 'canvas-circle' : '']"
        :style="{ '--duration': cssDuration }"
      >
        <template v-if="type == 'circle'">
          <view
            class="canvas-text"
            :style="{ color: color }"
            @click.stop="doSkip"
          >
            <slot name="text" :scope="textScope"> </slot>
          </view>
          <canvas
            class="my-canvas"
            :canvas-id="elId"
            :id="elId"
            @click="doSkip"
          ></canvas>
        </template>
        <view
          v-else-if="type == 'circle-card'"
          class="canvas-text"
          @click.stop="doSkip"
        >
          <slot name="text" :scope="timeOut"> </slot>
        </view>
        <view
          v-else-if="type == 'circle-card-1' && cssDuration"
          class="canvas-text-1"
          :class="[cssDuration ? 'canvas-text-1-active' : '']"
          :style="{visibility: cssDuration ? 'visible' : 'hidden'}"
          @click.stop="doSkip"
        >
          <slot name="text" :scope="timeOut"> </slot>
        </view>
      </view>
    </view>
    <view class="adv" v-else-if="type == 'normal'">
      <view class="btn_skip" @click="doSkip">
        <view class="wrap">
          <view class="skip">跳过 {{ timeOut }}</view>
        </view>
      </view>
    </view>
    <image
      @load="init"
      v-if="!onlyTimer"
      :src="src"
      @error="imgErr"
      class="bg"
    ></image>
    <view
      style="height: 100%; width: 100%; position: relative"
      v-if="$slots.default"
    >
      <slot></slot>
    </view>
    <u-empty v-else-if="showEmpty" text="未配置图片地址" mode="list"></u-empty>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // #ifdef MP-WEIXIN
      elBgId: 'myCanvasBg', // 微信小程序中不能使用this.$u.guid()形式动态生成id值，否则会报错
      elId: 'myCanvas',
      // #endif
      // #ifndef MP-WEIXIN
      elBgId: this.$u.guid(), // 非微信端的时候，需用动态的id，否则一个页面多个圆形进度条组件数据会混乱
      elId: this.$u.guid(),
      // #endif
      timer: null,
      timeOut: 3,
      cssDuration: 0,
      src: '',
      canvas: {},
      ctx: null,
      //--
      endTime: 0,
      imgEmpty: false,
      size: uni.upx2px(this.width), // 转成px后的整个组件的背景宽度
      lineWidth: uni.upx2px(this.borderWidth), // 转成px后的圆环的宽度
      percent: 0, // 进度条百分比
    };
  },
  mounted() {
    this.initPage();
  },
  props: {
    // 动画用的圆环颜色
    activeColor: {
      type: String,
      default: '#29e',
    },
    // 非动画用的圆环颜色
    inActiveColor: {
      type: String,
      default: '#ccc',
    },
    // 大小 单位 rpx
    width: {
      type: [Number, String],
      default: 160,
    },
    // ! 支持 normal / circle / circle-card / circle-card-1
    type: {
      type: String,
      default: 'normal',
    },
    // 单位毫秒
    duration: {
      type: [Number, String],
      default: 3000,
    },
    // 圆环宽度 单位 rpx
    borderWidth: {
      type: [Number, String],
      default: 15,
    },
    banner: {
      type: String,
      default: '',
    },
    onlyTimer: {
      type: Boolean,
      default: false,
    },
    skipBefore: {
      type: Function,
    },
    fontSize: {
      type: [Number, String],
      default: 12,
    },
    color: {
      type: String,
      default: '#333',
    },
    text: {
      type: String,
      default: '',
    },
    position: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    useCanvas() {
      return this.type === 'circle';
    },
    visibility() {
      return this.onlyTimer || this.src || this.showEmpty
        ? 'visible'
        : 'hidden';
    },
    radius() {
      return (this.size - this.lineWidth) / 2;
    },
    canvasConfig() {
      let {
        radius: r,
        lineWidth: line_w,
        activeColor,
        inActiveColor,
        size,
        color: textColor,
        text,
        ctx,
      } = this;
      return {
        r,
        line_w,
        activeColor,
        inActiveColor,
        size,
        textColor,
        text,
        ctx,
      };
    },
    showEmpty() {
      return !this.onlyTimer && (this.imgEmpty || !this.src);
    },
    showProgress() {
      return (
        (this.type == 'circle' && this.percent > 0) ||
        (['circle-card', 'circle-card-1'].includes(this.type) &&
          this.timeOut >= 0)
      );
    },
    textScope() {
      return Math.ceil(this.percent * (this.duration / 1000));
    },
    progressStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        zIndex: 1,
        ...this.position,
        '--active-color': `${this.activeColor}`,
        '--inactive-color': `${this.inActiveColor}`,
        '--line-width': `${this.lineWidth}px`,
      };
    },
  },
  methods: {
    initPage() {
      this.ctx = this.useCanvas ? uni.createCanvasContext(this.elId, this) : {};
      this.timeOut = this.duration / 1000;
      if (this.onlyTimer) {
        this.init();
      } else {
        if (this.banner) {
          // 使用图片， 为了效果需要在图片的onload里去调用init 而不是直接代码调用
          this.src = this.banner;
        } else {
          this.init();
        }
      }
    },
    init() {
      this.stopTimer();
      if (this.useCanvas) {
        this.updateTimer();
      } else {
        this.cssDuration = this.timeOut + 's';
        this.timer = setInterval(() => {
          if (this.timeOut - 1 <= 0) {
            this.doSkip();
          } else {
            this.timeOut--;
          }
        }, 1000);
      }
    },
    doSkip(e) {
      if (this.skipBefore) {
        this.skip_before(() => {
          this.stopTimer();
          this.cssDuration = 0;
          this.$emit('on-finish');
        });
      } else {
        this.stopTimer();
        this.cssDuration = 0;
        this.$emit('on-finish');
      }
    },
    // 校验前置条件
    skip_before(done) {
      if (this.skipBefore()) {
        done();
      }
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    imgErr() {
      this.imgEmpty = true;
      this.$emit('img-err');
    },
    drawStroke({ r, percent, line_w, activeColor, inActiveColor, ctx, size }) {
      let point = size / 2;
      // 背景圆环
      ctx.beginPath();
      ctx.arc(point, point, r, 0, 2 * Math.PI);
      ctx.setLineWidth(line_w);
      ctx.setStrokeStyle(inActiveColor);
      ctx.stroke();
      // 进度圆环
      ctx.beginPath();
      ctx.arc(
        point,
        point,
        r,
        -Math.PI / 2,
        2 * Math.PI * percent - Math.PI / 2
      );
      // 表示进度的两端为圆形
      ctx.setLineCap('round');
      ctx.setLineWidth(line_w);
      ctx.setStrokeStyle(activeColor);
      ctx.stroke();
    },
    drawText({ percent, textColor, text, ctx, size }) {
      let point = size / 2;
      text = text || Math.ceil(percent * (this.duration / 1000));
      // text = `${text || ''}${Math.ceil(percent * (this.duration / 1000))}s`;
      ctx.font = `${this.fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = textColor; // 例如设置为红色
      ctx.fillText(text, point, point);
    },
    // 多个变量逐一传递， 比在函数内部访问this 性能更高
    drawTimer({
      ctx,
      size,
      r,
      percent,
      line_w,
      activeColor,
      inActiveColor,
      end,
      textColor,
      text,
    }) {
      let point = size / 2;
      if (end) {
        this.stopTimer();
        // 边界处理 - 去掉留白
        ctx.beginPath();
        ctx.arc(point, point, r, 0, 2 * Math.PI);
        ctx.setLineWidth(line_w);
        ctx.setStrokeStyle(inActiveColor);
        ctx.stroke();
        ctx.closePath();
        ctx.draw();
        ctx.beginPath();
        ctx.clearRect(0, 0, size, size);
        ctx.draw();
        this.doSkip();
        return;
      }
      this.drawStroke({
        r,
        percent,
        line_w,
        activeColor,
        inActiveColor,
        ctx,
        size,
      });
      if (!this.$scopedSlots.text) {
        this.drawText({ percent, textColor, text, ctx, size });
      }
      ctx.draw();
    },
    updateTimer() {
      this.endTime = Date.now() + parseFloat(this.duration);
      let config = { ...this.canvasConfig };
      let time = Math.floor(this.duration / 100);
      let timeLeft, currentTime, percent;
      this.timer = setInterval(() => {
        currentTime = Date.now();
        timeLeft = this.endTime - currentTime;
        percent = timeLeft / this.duration;
        this.percent = percent;
        let params = { percent, ...config };
        if (timeLeft <= 0) {
          // 计时器结束
          this.drawTimer({
            ...params,
            end: true,
          });
          return;
        }
        this.drawTimer({ ...params });
      }, time);
    },
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>

<style lang="scss">
// @import '~@/colorui/scss/_variables.scss';
@mixin full-fill() {
    height: 100%;
    width: 100%;
}

@mixin flex {
    display: flex;
}
@mixin flex-center {
    @include flex;
    align-items: center;
    justify-content: center;
}
@property --t {
  syntax: '<angle>';
  initial-value: 360deg;
  inherits: false;
}
.page {
  height: 100%;
  width: 100%;
  overflow: hidden;
  visibility: hidden;
  .progress {
    position: absolute;
    right: var(--btn-right, 2px);
    top: var(--btn-top, 3px);
    z-index: 1;
    .pr {
      position: relative;
      @include full-fill;
      @include flex-center;
    }
    .my-canvas {
      z-index: 1;
      position: absolute;
      inset: 0;
    }
    $color: rgba(255, 255, 255, 0.6);
    @mixin canvas-text {
      flex: 1;
      height: 100%;
      width: 100%;
      text-align: center;
      @include flex-center;
      font-size: 12px;
      z-index: 2;
      position: absolute;
      border-radius: 50%;
    }
    .canvas-text {
      @include canvas-text;
    }
    &.circle-card {
      border-radius: 50%;
      background: transparent;
      &:not(.circle) {
        border: 1px solid $color;
      }
      padding: 1px;
      .canvas-text {
        background: transparent;
        height: 100%;
        width: 100%;
      }
      .pr:not(.canvas-circle) {
        position: relative;
        @include full-fill;
        @include flex-center;
        &::after {
          content: '';
          position: absolute;
          box-sizing: border-box;
          top: 50%;
          left: 50%;
          background: $color;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      &.circle-card-1 {
        border: none;
        .pr {
          $padding: 5px;
          &::after {
            display: none;
          }
        }
      }
    }
    .canvas-text-1 {
      @include canvas-text;
      background: transparent;
      --t: 360deg;
      background: conic-gradient(
        var(--active-color) 0deg var(--t, 360deg),
        var(--inactive-color) var(--t, 360deg) 360deg
      );
      position: relative;
      @include full-fill;
      @include flex-center;
      &::after {
        content: '';
        position: absolute;
        top: var(--line-width, 3px);
        left: var(--line-width, 3px);
        right: var(--line-width, 3px);
        bottom: var(--line-width, 3px);
        z-index: -1;
        box-sizing: border-box;
        background: #fff;
        border-radius: 50%;
      }
      &-active {
        --t: 0deg;
        animation: round var(--duration,3s) linear;
      }
    }
  }
  &.l-hello-wrap {
    position: relative;
  }
}
.adv {
  background: #efefef;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.btn_skip {
  z-index: 10;
  position: fixed;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  border-radius: 4px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  height: 100%;
  width: 100%;
}
@keyframes round {
  from {
    --t: 360deg;
  }
  to {
    --t: 0deg;
  }
}
</style>
