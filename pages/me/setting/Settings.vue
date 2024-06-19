<template>
	<view >
		<view style="padding: 20rpx;">
			
		
		<!--<uni-easyinput  disabled  v-model="name"  placeholder="请输入内容" ></uni-easyinput>
		
		
		<uni-easyinput style="margin-top:20rpx"    v-model="nickName"  placeholder="昵称" ></uni-easyinput>
		
	 	<view style="margin-top:20rpx;display: flex; align-items: center; justify-content: flex-start;">
			
			<text>认证状态:</text>
			
			<uni-tag :inverted="true" text="待审核" type="primary" style="margin-left:20rpx" />
			
			<view style="display: flex;margin-left: 20rpx;">
				
			<button type="primary" plain="true" size="mini">申请认证</button>
			</view>
			
			</view> -->
		
		
		</view>
		<view style="position: fixed; bottom: 0; width:100%;">
			<!-- <button style=" width:80%;margin-bottom:20rpx;" type="primary" @click="submit">保存</button> -->
			
			<button style=" width:80%;margin-bottom:20rpx;" type="warn" @click="logOut()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '张三',
				nickName:'qingq'
			}
		},
		methods: {
			logOut(){
				//帮我弹出一个系统对话框
				uni.showModal({
                    title: '提示',
                    content: '确定要退出登录吗？',
                    success: (res)=> {
                        if (res.confirm) {
							// alert("confirm")
							this.$store.dispatch('LogOut').then(() => {
							  uni.navigateBack();
							})
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
			}
		}
	}
</script>

<style lang="scss">

</style>
