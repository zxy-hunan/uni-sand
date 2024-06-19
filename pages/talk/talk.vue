<template>
	<view>
		<view style="display: flex;flex-direction: column;padding: 20rpx 0rpx;">

			<view v-for="(item, index) in contentList" :key="index" @click="gotoDetail(item)"
				style="display: flex;flex-direction: column;margin-top: 20rpx;background-color: white;padding: 20rpx;">
				<view style="display: flex;align-items: center;">

					<image v-if="isStringNotEmpty(item.sysUser.avatar)"
						style="width: 60rpx;height: 60rpx;border-radius: 50%;" :src="baseUrl+item.sysUser.avatar">
					</image>
					<image v-else style="width: 60rpx;height: 60rpx;border-radius: 50%;" src="../../static/logo.png">
					</image>


					<view style="display: flex;flex-direction: column;margin-left: 20rpx;">

						<text style="font-size: 0.8rem;color:#000">{{item.sysUser.nickName}}</text>
						<text style="font-size: 0.7rem;color:#aaa">{{formatDate(item.createTime)}}</text>

					</view>

				</view>

				<text class="text-overflow" style="font-size: 1.0rem;margin-top: 20rpx;">{{item.content}}</text>


				<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">

					<view style="width: 33%;display: flex;align-items: center;justify-content: center;">

						<uni-icons type="undo" size="20" color="#aaa"></uni-icons>
						<text style="font-size: 0.8rem;color: #aaa;margin-left: 10rpx;">分享</text>

					</view>

					<view style="width: 33%;display: flex;align-items: center;justify-content: center;">

						<uni-icons type="chat" size="20" color="#aaa"></uni-icons>
						<text style="font-size: 0.8rem;color: #aaa;margin-left: 10rpx;">{{item.commNum}}</text>

					</view>


					<view @click.stop="clickStar(item)"
						style="width: 33%;display: flex;align-items: center;justify-content: center;">

						<uni-icons type="hand-up" size="20" :color="item.comStar==null ? '#aaa': '#1e80ff'"></uni-icons>
						<text class="badge" :style="{'color':item.comStar==null ? '#aaa': '#1e80ff'}">
							{{item.starNum ==0 ? '&nbsp;':item.starNum }}</text>

					</view>


				</view>

			</view>

		</view>

		<uni-fab ref="fab" :pattern="pattern" :content="content" vertical="bottom" dection="horizontal"
			horizontal="right" @fabClick="fabClick" @trigger="trigger" />

	</view>
</template>

<script>
	import {
		listArticle
	} from "@/api/article/article";
	import {
		listStar,
		delStar,
		addStar
	} from "@/api/system/star";
	import config from '@/config';
	import {
		getFormatTime
	} from "@/utils/common.js";
	export default {
		data() {
			return {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#1e80ff',
					buttonColor: '#1e80ff',
					iconColor: '#fff',
					icon:'compose'
				},
				baseUrl: config.baseUrl,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					title: null,
					content: null,
					userId: null,
					comId: 5,
				},
				contentList: [],
				starform: {},
			};
		},
		onPullDownRefresh() {
			this.contentList = [];
			this.queryParams.pageNum = 1;
			this.getDetail();

		},
		computed: {
			formatDate() {
				// alert('123'+time)
				return function(time) {
					console.log('time' + time)
					return getFormatTime(time, null)
				}
			}
		},

		methods: {
			fabClick() {
				uni.navigateTo({
					url: '/pages/home/AddArticle?type=' + 5
				})
			},
			resetstarform() {
				this.starform = {
					articleId: null,
					userId: null,
				};
			},

			clickStar(item) {
				// alert('click')
				this.resetstarform();
				this.starform.articleId = item.id;
				this.starform.userId = this.$store.state.user.id;

				if (item.comStar == null) {
					addStar(this.starform).then(response => {
						// alert(JSON.stringify(response))
						if (response.code == 200) {
							item.starNum = item.starNum + 1;
							item.comStar = {};
						}
					});
				} else {
					// this.ids = item.id;
					delStar(this.starform).then(response => {
						if (response.code == 200) {
							item.starNum = item.starNum - 1;
							item.comStar = null;
						}
					});

				}
			},

			isStringNotEmpty(str) {
				return str !== null && str !== undefined && str !== '';
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/pages/home/ArticleDetail?item=' + JSON.stringify(item), // 传递参数到下一个页面
				})
			},

			getDetail() {
				this.queryParams.userId = this.$store.state.user.id;
				listArticle(this.queryParams).then(response => {
					response.rows.forEach(element => {
						element.srcList = [];
						element.srcList.push(element.imageurl);
					});
					console.log(response.rows);
					this.contentList = [...this.contentList, ...response.rows];
					uni.stopPullDownRefresh(); //停止下拉刷新
				});
			},

		},
		onLoad() {
			this.getDetail();
		}
	}
</script>

<style lang="scss">
	.badge {
		margin-left: 10rpx;
	}
	
	.text-overflow {
		display: -webkit-box;
		/* 使用Webkit的弹性盒子模型显示 */
		-webkit-line-clamp: 2;
		/* 限制在一个块元素显示的文本的行数 */
		-webkit-box-orient: vertical;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		overflow: hidden;
		/* 隐藏超出容器的内容 */
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		width: 100%;
		/* 示例宽度，根据需求调整 */
	}
</style>