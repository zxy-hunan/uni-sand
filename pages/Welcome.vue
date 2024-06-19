<template>
	<view>
		<!-- 设置一个启动图 -->
		<!-- <image src="启动图的路径" mode="aspectFill"></image> -->
		<!-- 调用延迟跳转方法 -->
		<view
			style="display: flex;flex-direction: column; align-items: center;height: 100vH;width: 100vw;justify-content: center;">

			<view style="height: 50vh;display: flex;flex-direction: column-reverse;">
				<view style="display: flex;align-items: center;">

					<image style="width: 50vw;" src="/static/bg1.png" mode="aspectFit"></image>

					<image style="width: 50vw;" src="/static/bg2.png" mode="aspectFit"></image>
				</view>
			</view>

			<view style="height: 50vh;display: flex;flex-direction: column;">
				<view style="display: flex;align-items: center;">

					<image style="width: 50vw;" src="/static/bg3.png" mode="aspectFit"></image>

					<image style="width: 50vw;" src="/static/bg4.png" mode="aspectFit"></image>

				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			//延迟三秒后跳转
			delayJump() {
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/home/home'
					});
				}, 5000); // 延迟3秒后执行跳转操作
			},

		},
		onLoad() {
			this.delayJump();
		}
	}
</script>

<style lang="scss">

</style>