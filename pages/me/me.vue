<template>
	<view>

		<!-- <hm-head-portrait-card :options="options"></hm-head-portrait-card> -->
		<!-- <uni-icons type="chat" size="30"></uni-icons> -->

		<view style="display: flex;justify-content: space-between;padding: 80rpx 40rpx 20rpx 40rpx;">

			<view @click="jumpDetail()">
				<uni-icons type="scan" size="25"></uni-icons>

			</view>

			<view style="display: flex;flex-direction: row-reverse;" @click="jumpSetting()">

				<uni-icons type="settings" size="25"></uni-icons>
			</view>

		</view>

		<view style="display: flex;flex-direction: column;margin: 20rpx;">

			<view>

				<view style="display: flex;flex-direction: row;align-items: center;padding: 30rpx;">
					<image v-if="isStringNotEmpty(avatar)" style="width: 100rpx;height: 100rpx;border-radius: 50%;"
						:src="avatar"></image>
					<image v-else style="width: 100rpx;height: 100rpx;border-radius: 50%;" src="../../static/logo.png">
					</image>


					<view v-if="isStringNotEmpty(token)" style="display: flex;flex-direction: column;">
						<text style="margin-left: 20rpx;font-size: 1rem;">{{nickname}}</text>
						<text style="margin-left: 20rpx;font-size: 0.8rem;margin-top: 20rpx;">累计签到1天</text>
					</view>

					<text v-else style="margin-left: 20rpx;" @click="login()">登录/注册</text>

				</view>


			</view>

			<!-- -->

			<view style="display: flex;align-items: center;flex-direction: row;margin-top: 20rpx;
			justify-content: space-between;padding-bottom: 30rpx;">

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;">
					<!-- <view> 
					<uni-icons type="compose" size="30"></uni-icons>
					</view> -->


					<text style="color: black;font-size: 0.9rem;">{{totalArticle}}</text>

					<text style="color: black;font-size: 0.8rem;">帖文</text>
				</view>

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;">
					<!-- <uni-icons type="hand-up" size="30"></uni-icons> -->
					<text style="color: black;font-size: 0.9rem;">{{totalStar}}</text>

					<text style="color: black;font-size: 0.8rem;">点赞</text>
				</view>


				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;">
					<!-- <uni-icons type="chat" size="30"></uni-icons> -->
					<text style="color: black;font-size: 0.9rem;">{{totalComm}}</text>
					<text style="color: black;font-size: 0.8rem;">评论</text>
				</view>




			</view>

		</view>

		<view
			style="display: flex;flex-direction: column;background-color: #fff;border-radius: 20rpx;margin: 20rpx;padding: 30rpx;">

			<view style="display: flex;align-items: center;flex-direction: row;margin-top: 30rpx;
			justify-content: space-between;">

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpDetail()">

					<image style="width: 60rpx;height: 60rpx;" src="../../static/images/me_set1.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">已签到</text>
				</view>

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpDetail()">

					<image style="width: 60rpx;height: 60rpx;" src="../../static/images/me_set2.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">幸运转盘</text>
				</view>

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpDetail()">

					<image style="width: 60rpx;height: 60rpx;" src="../../static/images/me_set3.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">挑战</text>
				</view>

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpDetail()">

					<image style="width: 60rpx;height: 60rpx;" src="../../static/images/me_set4.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">福利兑换</text>
				</view>


			</view>


		</view>




		<view
			style="display: flex;flex-direction: column;background-color: #fff;border-radius: 20rpx;margin: 20rpx;padding: 30rpx;">

			<text>创作者中心</text>

			<view style="display: flex;align-items: center;flex-direction: row;margin-top: 30rpx;
			justify-content: space-between;">

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpPersonal(0)">

					<!-- <uni-icons type="gift" size="25"></uni-icons> -->
					<image style="width: 50rpx;height: 50rpx;" src="../../static/images/icon/java.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">后端</text>
				</view>

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpPersonal(1)">

					<!-- <uni-icons type="help" size="25"></uni-icons> -->
					<image style="width: 50rpx;height: 50rpx;" src="../../static/images/icon/javascript.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">前端</text>
				</view>

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpPersonal(2)">

					<!-- <uni-icons type="reload" size="25"></uni-icons> -->
					<image style="width: 50rpx;height: 50rpx;" src="../../static/images/icon/android.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">移动端</text>
				</view>

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpPersonal(3)">

					<!-- <uni-icons type="color" size="25"></uni-icons> -->
					<image style="width: 50rpx;height: 50rpx;" src="../../static/images/icon/other.png"></image>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">其他</text>
				</view>


			</view>


		</view>


		<view
			style="display: flex;flex-direction: column;background-color: #fff;border-radius: 20rpx;margin: 20rpx;padding: 30rpx;">

			<text>更多功能</text>

			<view style="display: flex;align-items: center;flex-direction: row;margin-top: 30rpx;
			justify-content: space-between;">

				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpinfo()">

					<uni-icons type="person" size="25"></uni-icons>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">个人中心</text>
				</view>


				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;" @click="jumpAbout()">

					<uni-icons type="info" size="25"></uni-icons>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">关于我们</text>
				</view>



				<view style="display: flex;flex-direction: column;align-items: center;width: 33%;"
					@click="jumpSetting()">

					<uni-icons type="gear" size="25"></uni-icons>

					<text style="color: black;font-size: 0.8rem;margin-top: 10rpx;">设置</text>
				</view>




			</view>


		</view>


		<!-- 	<uni-list :border="false">
		<uni-list-item title="个人中心" @click="jumpPersonal()"></uni-list-item>
		<uni-list-item title="关于我们" @click="jumpAbout()"></uni-list-item>
		<uni-list-item title="设置" @click="jumpSetting()"></uni-list-item>
	</uni-list> -->

	</view>
</template>

<script>
	import {
		listArticle
	} from "@/api/article/article";
	import {
		listComm
	} from "@/api/article/comcomm";
	import {
		listStar
	} from "@/api/system/star";
	import storage from '@/utils/storage'
	import HmHeadPortraitCard from '@/components/hm-head-portrait-card/index.vue'
import { toast } from "../../utils/common";
	export default {
		components: {
			HmHeadPortraitCard
		},
		data() {
			return {
				// nickname: this.$store.state.user.nickname,
				// token: this.$store.state.user.token,
				totalComm: 0,
				totalArticle: 0,
				totalStar: 0,
				queryParams: {
					pageNum: 1,
					pageSize: 1000,
					isSelf: 0,
					userId: null,
				},
			};
		},
		methods: {
			
			jumpDetail() {
				toast("小哥正火速开发中...");
			},
			
			jumpinfo() {
				uni.navigateTo({
					url: '/pages/me/setting/info'
				});
			},
			
			jumpPersonal(index) {
				uni.navigateTo({
					url: '/pages/me/setting/Personal?index='+index
				});
			},
			jumpAbout() {
				uni.navigateTo({
					url: '/pages/me/setting/About'
				});
			},
			jumpSetting() {
				// alert("jump");
				uni.navigateTo({
					url: '/pages/me/setting/Settings'
				});
			},
			login() {
				uni.navigateTo({
					url: '/pages/me/login'
				});
			},
			isStringNotEmpty(str) {
				return str !== null && str !== undefined && str !== '';
			},
			getStatics() {
				this.queryParams.userId = this.$store.state.user.id;
				//总评论
				listComm(this.queryParams).then(response => {
					// alert( response.total)
					this.totalComm = response.total;
				});
				//总帖文
				listArticle(this.queryParams).then(response => {
					// alert( response.total)
					this.totalArticle = response.total;
				});
				//总点赞
				listStar(this.queryParams).then(response => {
					// alert( response.total)
					this.totalStar = response.total;
				});

			},
		},
		computed: {
			avatar() {
				return this.$store.state.user.avatar
			},
			nickname() {
				return this.$store.state.user.nickname
			},
			token() {
				return this.$store.state.user.token
			}
		},

		onLoad() {
			console.log("onLoad");
			console.log(this.token);
			// console.log(this.nickname);
		},

	}
</script>

<style lang="scss">

</style>