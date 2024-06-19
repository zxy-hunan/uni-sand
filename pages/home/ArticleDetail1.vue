<template>
	<view>
<uni-icons type="chat" size="30"></uni-icons>

		<view style="display: flex;flex-direction: column;margin: 20rpx;">
			<uni-icons type="star" size="10"></uni-icons>

			<text style="display: flex;align-items: center;justify-content: start;font-size: 1.2rem;"> {{response.title}}</text>

			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 40rpx;">

				<!-- -->
				<view style="display: flex;">

					<view>
						<image style="width: 80rpx;height: 80rpx;border-radius: 50%;"
							:src="baseUrl+response.sysUser.avatar">
						</image>
					</view>
					
						
					

					<view style="display: flex;flex-direction: column;margin-left: 30rpx;">

						<text style="font-size: 0.8rem;">{{response.sysUser.nickName}}</text>
						<text style="font-size: 0.7rem;margin-top: 10rpx;">{{response.createTime}}</text>

					</view>

				</view>

				<!-- -->
				<view>
					<button type="primary" size="mini">关注</button>
			
				</view>


			</view>

			<!-- -->

			<view style="margin-top: 40rpx;">
				
			</view>

		</view>

		<view style="position: fixed; bottom: 0; width:100%;border: 1px solid #8a919f;background-color: antiquewhite;height: 100rpx;">
			

			<view style="display: flex;align-items: center;padding: 20rpx;justify-content: space-between;">

				<view style="width: 100%;margin-right: 50rpx;">

					<uni-easyinput></uni-easyinput>

				</view>


				<view style="display: flex;align-items: center;">

					<unicons type="chat" size="30" color="black"></unicons>

					<uni-icons style="margin:0rpx 30rpx;" type="hand-up" size="30"></uni-icons>



				</view>

			</view>

		</view>

	</view>
</template>

<script>
	import config from '@/config';
	import {
		getArticle,
	} from "@/api/article/article";
	import {
		listComm,
	} from "@/api/article/comcomm";
	import {
		getStar,
		delStar,
	} from "@/api/system/star";

	export default {
		data() {
			return {
				baseUrl: config.baseUrl,
				item: {},
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					parId: null,
					content: null,
					userId: null,
					articleId: null,
				},
				commList: [],
				total: [],
				response: {},
			};
		},
		onLoad(options) {
			this.item = JSON.parse(options.item);
			// alert(this.item.id)
			this.getDetail();
		},
		methods: {

			/** 查询pingl 列表 */
			getList() {
				this.queryParams.articleId = this.response.id;
				// alert(''+this.queryParams.articleId)
				listComm(this.queryParams).then(response => {
					this.commList = response.rows;
					this.total = response.total;
				});
			},


			getDetail() {

				getArticle(this.item.id).then(response => {
					// alert(JSON.stringify(response))
					this.response = response.data;
					this.getList();
				});

			},

		}
	}
</script>

<style lang="scss">

</style>