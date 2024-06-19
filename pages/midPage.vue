<template>
	<view style="background: #fff;" @click="closePage()">
		<view class="bottom-bar" >
			<view style="height: 50%;display: flex;justify-content: center;">
				<image src="../static/add_bg.png" style="margin-top: 200rpx;" mode="aspectFit" ></image>
			</view>
			
			<view style="height: 50%;display: flex;flex-direction: column-reverse;">
			<view class="content">
				
				
				<view style="margin-bottom: 40rpx;width: 100%;">
				<view v-for="item in itemList" style="display: flex;flex-direction: column;width: 100%;">
					
					<view class="itemclass" @click.stop="gotoPublish(item)">
						
						<!-- <uni-icons :type="item.type" size="30"></uni-icons> -->
						<image style="width: 50rpx;height: 50rpx;" :src="item.type"></image>
						
						<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
							
							<text style="font-size: 1.0rem;font-weight: bold;">{{item.name}}</text>
							<text style="font-size: 0.8rem;">{{item.time}}</text>
							
						</view>
						
						
					</view>
					
					
				</view>
				</view>
				
				
				<view style="display: flex;flex-direction: column;"  @click="closePage()">
					<image  ref="rotatingImage" :style="{ transition: 'transform 0.1s', transform: rotateStyle }"
						src="/static/images/tabbar/add.png" class="imageadd">
					</image>

				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotateStyle: '',
				rotateAngle: 0,
				itemList:[{
					index:0,
					type:"../static/images/icon/java.png",name:"后端",time:"实现系统的核心功能和业务规则"
				},{
					index:1,
					type:"../static/images/icon/javascript.png",name:"前端",time:"界面设计实现,交互逻辑编写,性能优化"
				},{
					index:2,
					type:"../static/images/icon/android.png",name:"移动端",time:"响应式设计,原生应用开发,混合应用开发"
				},{
					index:3,
					type:"../static/images/icon/other.png",name:"其他",time:"互联网前言技术"
				}]
			};
		},
		methods: {
			gotoPublish(item) { // 跳转到发布页面，这里需要根据实际情况进行实现。
                uni.redirectTo({
                	url: '/pages/home/AddArticle?type=' + item.index
                })
            },
			
			closePage() {
				console.log(":close");
				uni.navigateBack();
			}
		},
		mounted() {
			setTimeout(() => {
				this.rotateStyle = `rotate(${45}deg)`;
				this.rotateImage();
			}, 0); // 图片将在2秒后开始旋转
		},
		// methods: {
		// 	rotateImage() {
		// 		this.rotateAngle = 45; // 每次增加90度
		// 		 // 更新旋转角度
				 
		// 	},
		// }
	}
</script>

<style>
	page {
		/* background: rgba(0, 0, 0, 0.5); */
		background: #fff;
	}

	.bottom-bar {
		background: transparent;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		height: 100vh;
	}

	.content {
		padding: 5px;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.imageadd {
		width: 55px;
		height: 55px;
	}
	
	.itemclass{
		display: flex;align-items: center;background-color: #fffaf0;
		padding: 20rpx;border-radius: 20rpx;margin:20rpx 20rpx 0rpx 20rpx;
	}
</style>