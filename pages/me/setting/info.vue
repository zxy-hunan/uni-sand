<template>
	<view >
		<view style="padding: 20rpx;">
			
		
		<uni-easyinput  disabled  v-model="name" :inputBorder="false" placeholder="用户名" ></uni-easyinput>
		
		
		<uni-easyinput style="margin-top:20rpx" :inputBorder="false"  v-model="nickName"  placeholder="昵称" ></uni-easyinput>
		

		
		
		</view>
		<view style="position: fixed; bottom: 0; width:100%;">
			<button style=" width:80%;margin-bottom:20rpx;" type="primary" @click="changeInfo">修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: this.$store.state.user.name,
				nickName:this.$store.state.user.nickname,
			}
		},
		methods: {
		changeInfo(){
			uni.showModal({
		        title: '提示',
		        content: '确定修改？',
		        success: (res)=> {
		            if (res.confirm) {
						// alert("confirm")
						
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
