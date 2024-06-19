<template>
	<view>
		<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>

		<o-empty v-if="total==0" style="height: 100vh;" text="暂时没有数据..." />
		<div v-for="item in contentList" @click="gotoDetail(item)">

			<div style="display: flex; margin: 20rpx 0rpx 0rpx 0rpx;padding: 10rpx 20rpx; background-color: #fff;">

				<div style="display: flex;flex-direction: column;width: 80%;color:grey">

					<view style="display: flex;align-items: center;">
						<div style="display: flex;margin-right: 10rpx;width: 150rpx;">
							<uni-tag :inverted="true" v-if="item.status == 0" text="待审核" type="warning" size="small"
								/>
							<uni-tag :inverted="true" v-if="item.status == 1" text="已通过" type="success" size="small"
								 />
							<uni-tag :inverted="true" v-if="item.status == 2" text="未通过" type="error" size="small"
								 />

						</div>
						<text class="text-overflow1"
							style="padding-top: 10rpx;font-size: 1.0rem;color: #000;">{{item.title}}</text>
					</view>

					<text class="text-overflow" style="padding-top: 10rpx;font-size: 0.8rem;">{{item.content}}</text>


				</div>

				<div style="display: flex;width: 20%;display: flex;align-items: center;">

					<image :src="item.imageurl" style="height: 80px;width: 110px; border-radius: 5px;"></image>

				</div>

			</div>

		</div>


	</view>
</template>

<script>
	import {
		listArticle,
	} from "@/api/article/article";
	export default {
		data() {
			return {
				current: 0,
				tabs: ['后端', '前端', '移动端', '其他'],
				contentList: [],
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					isSelf: 0,
					title: null,
					content: null,
					userId: null,
					comId: 0,
				},
				total: 0,

			};
		},
		methods: {
			gotoDetail(item) {
				uni.navigateTo({
					url: '/pages/home/ArticleDetail?item=' + JSON.stringify(item), // 传递参数到下一个页面
				})
			},
			changeTab(index) {
				console.log('当前选中的项：' + index)
				this.contentList = [];
				this.total = 0;
				this.queryParams.pageNum = 1;
				this.queryParams.comId = index;
				this.getList();
			},

			getList() {
				this.queryParams.userId = this.$store.state.user.id;
				listArticle(this.queryParams).then(response => {
					console.log('contentList1:' + this.contentList.length);
					this.contentList = [...this.contentList, ...response.rows];
					this.total = response.total;
					console.log('contentList2:' + this.contentList.length);

				});
			},
		},
		onPullDownRefresh() {
			this.contentList = [];
			this.total = 0;
			this.queryParams.pageNum = 1;
			this.getList();
		},
		onReachBottom() {
			this.queryParams.pageNum++;
			this.getList();
		},
		onLoad(options) {
			this.current = options.index;
			this.queryParams.comId = options.index;
			this.getList();
		}
	}
</script>

<style lang="scss">
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
</style>