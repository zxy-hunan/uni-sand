<template>
	<view>

		<view style="display: flex;align-items: center;background-color: #fff;padding-top: 80rpx;">
			<uni-search-bar style="width: 85%;padding: 0rpx 20rpx;" radius="20" placeholder="搜索江水淘沙" clearButton="none"
				cancelButton="none" @confirm="search" />

			<image style="width: 50rpx;height: 50rpx;border-radius: 50%;" src="/static/sign.png"></image>

		</view>

		<!-- tab切换 -->
		<v-tabs class="header" v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
		<!-- 内容区域 -->

		<div style="margin-top: 20rpx;padding: 10rpx 20rpx;background-color: #fff;">

			<image style="width: 50rpx;height: 50rpx;border-radius: 50%;" src="/static/hot.png"></image>

			<div v-for="(item,index) in contentHotList" @click="gotoDetail(item)"
				style="display: flex;margin-top: 10rpx;width: 100%;align-items: center;">

				<text class="tvclass"
					:style="{ backgroundColor: index==0 ? '#e84749': (index==1 ? '#d84a1b' : '#d87a16') }">{{index+1}}</text>

				<text class="text-overflow1"
					style="font-size: 0.8rem;margin-left: 20rpx;color: #000;">{{item.content}}</text>
			</div>

		</div>

		<div v-for="item in contentList" @click="gotoDetail(item)">

			<div style="display: flex; margin: 20rpx 0rpx 0rpx 0rpx;padding: 10rpx 20rpx; background-color: #fff;">

				<div style="display: flex;flex-direction: column;width: 80%;color:grey">

					<text class="text-overflow1"
						style="padding-top: 10rpx;font-size: 1.0rem;color: #000;">{{item.title}}</text>

					<div style="display: flex;padding-top: 10rpx;align-items: center;">

						<image style="width: 40rpx;height: 40rpx;border-radius: 50%;"
							:src="baseUrl+item.sysUser.avatar">
						</image>
						<text style="padding-left: 10rpx;font-size: 0.7rem;">{{item.sysUser.nickName}}</text>

					</div>

					<text class="text-overflow" style="padding-top: 10rpx;font-size: 0.8rem;">{{item.content}}</text>

					<div style="display: flex;padding-top: 10rpx;align-items: center;">

 
						<view v-if="item.comStar == null" @click.stop="clickStar(item)">
							 <transition name="like-animation">
							<uni-icons  type="hand-up" size="20" class="like-icon"></uni-icons></transition>
							<text
								style="padding-left: 5rpx;font-size: 0.7rem;">{{item.starNum ==0 ? '':item.starNum }}</text>
						</view>

						<view v-else @click.stop="clickStar(item)">
							<uni-icons  type="hand-up" size="20" color="#1e80ff"></uni-icons>
							<text
								style="padding-left: 5rpx;font-size: 0.7rem;color: #1e80ff;">{{item.starNum ==0 ? '':item.starNum }}</text>
						</view>


						<uni-icons style="padding-left: 30rpx;" type="chat" size="20"></uni-icons>
						<text style="padding-left: 5rpx;font-size: 0.7rem;">{{ item.commNum}}</text>

					</div>

				</div>

				<div style="display: flex;width: 20%;display: flex;align-items: center;">

					<image :src="item.imageurl" style="height: 80px;width: 110px; border-radius: 5px;"></image>

				</div>

			</div>

		</div>


		<!-- <uni-fab style="margin-bottom: 1000px;" ref="fab" :content="content" 
		 vertical="bottom" dection="horizontal" horizontal="right" @fabClick="fabClick" 
			@trigger="trigger" /> -->

	</view>
</template>

<script>
	import {
		toast
	} from "../../utils/common";
	import {
		listArticle,
		getArticle,
		delArticle,
		addArticle,
		updateArticle
	} from "@/api/article/article";
	import {
		listStar,
		getStar,
		delStar,
		addStar,
		updateStar
	} from "@/api/system/star";
	import config from '@/config';
	export default {
		data() {
			return {
				baseUrl: config.baseUrl,
				contentHotList: [],
				queryArticleParams: {
					pageNum: 1,
					pageSize: 3,
				},
				contentList: [],
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					title: null,
					content: null,
					userId: null,
					comId: null,
				},
				// 总条数
				total: 0,
				form: {},
				current: 0,
				tabs: ['综合', '后端', '前端', '移动端', '其他'],
				content: [{
						iconPath: '/static/logo.png',
						selectedIconPath: '/static/logo.png',
						text: '特产',
						active: false
					},
					{
						iconPath: '/static/logo.png',
						selectedIconPath: '/static/logo.png',
						text: '闲置',
						active: false
					},
					{
						iconPath: '/static/logo.png',
						selectedIconPath: '/static/logo.png',
						text: '交换',
						active: false
					},
					{
						iconPath: '/static/logo.png',
						selectedIconPath: '/static/logo.png',
						text: '工具',
						active: false
					}
				],
				form: {},

			};
		},
		onPullDownRefresh() {
			this.contentList = [];
			this.contentHotList = [];
			this.queryParams.pageNum = 1; // 重置页码为1
			this.getList(); // 重新加载数据
			this.getHotList();

		},
		onReachBottom() { // 监听页面触底事件，加载更多数据。
			if (this.total > this.contentList.length) { // 判断是否还有更多数据可加载。
				this.queryParams.pageNum += 1; // 页码加1。
				this.getList(); // 加载更多数据。
			} else { // 如果没有更多数据可加载，则提示用户。
				// uni.showToast({
				// 	title: '没有更多数据了',
				// });
				// toast('没有更多数据了');
			}
		},

		methods: {
			reset() {
				this.form = {
					articleId: null,
					userId: null,
				};
			},
			clickStar(item) {
				// alert('click')
				this.reset();
				this.form.articleId = item.id;
				this.form.userId = this.$store.state.user.id;

				if (item.comStar == null) {
					addStar(this.form).then(response => {
						// alert(JSON.stringify(response))
						if (response.code == 200) {
							item.starNum = item.starNum + 1;
							item.comStar = {};
						}
					});
				} else {
					// this.ids = item.id;
					delStar(this.form).then(response => {
						// alert(JSON.stringify(response))
						if (response.code == 200) {
							item.starNum = item.starNum - 1;
							item.comStar = null;
						}
					});

				}
			},

			closeBtn() {
				if (this.$refs.fab.isShow) {
					this.$refs.fab.close()
					return true
				}
				return false
			},

			changeTab(index) {
				console.log('当前选中的项：' + index)
				this.queryParams.comId = index == 0 ? '' : index;
				this.contentList = []; // 清空列表，重新加载数据。
				this.queryParams.pageNum = 1; // 重置页码为1。
				this.getList(); // 重新加载数据。
			},

			fabClick() {
				// toast("fabbutton");
			},

			trigger(e) {
				// toast("trigger:"+e.index);
				this.closeBtn();
				// 跳转到发布页面携带参数
				uni.navigateTo({
					url: '/pages/home/AddArticle?type=' + e.index
				})

			},

			gotoDetail(item) {
				uni.navigateTo({
					url: '/pages/home/ArticleDetail?item=' + JSON.stringify(item), // 传递参数到下一个页面
				})
			},

			getList() {
				this.queryParams.userId = this.$store.state.user.id;
				// alert(this.queryParams.userId)
				listArticle(this.queryParams).then(response => {

					this.contentList = [...this.contentList, ...response.rows];
					this.total = response.total;

				});
				uni.stopPullDownRefresh();
			},

			getHotList() {
				listArticle(this.queryArticleParams).then(response => {

					this.contentHotList = [...this.contentHotList, ...response.rows];

				});
			}

		},
		onLoad() {
			this.getList();
			this.getHotList();
		}
	}
</script>

<style lang="scss">
	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
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

	.text-overflow1 {
		display: -webkit-box;
		/* 使用Webkit的弹性盒子模型显示 */
		-webkit-line-clamp: 1;
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

	.tvclass {
		padding: 5rpx 13rpx 5rpx 13rpx;
		border-radius: 10rpx;
		color: #fff;
		font-size: 0.8rem;
	}

	.header {
		padding: 40rpx 40rpx 20rpx 0rpx;
		background-color: #fff;
		position: -webkit-sticky;
		/* Safari */
		position: sticky;
		top: 0;
		z-index: 999;
		/* 确保吸顶时覆盖在其他内容之上 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* 可选：添加阴影效果 */
	}
	
	.like-icon {
	  transition: all 0.3s ease;
	}
	
	.like-animation-enter-active,
	.like-animation-leave-active {
	  transition: all 0.3s ease;
	}
	
	.like-animation-enter,
	.like-animation-leave-to {
	  opacity: 0;
	  transform: translateY(-10px) scale(1.2);
	}
</style>