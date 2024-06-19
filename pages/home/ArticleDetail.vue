<template>
	<view>

		<o-empty v-if="JSON.stringify(response)=='{}'" style="height: 100vh;" height="100%" text="暂无数据..." />

		<view v-else style="display: flex;flex-direction: column;margin: 20rpx;padding-bottom: 120rpx; ">

			<text style="display: flex;align-items: center;justify-content: start;font-size: 1.2rem;">
				{{response.title ? response.title:''}}</text>

			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 40rpx;">

				<!-- -->
				<view style="display: flex;">

					<view>
						<image style="width: 80rpx;height: 80rpx;border-radius: 50%;" :src="baseUrl+avatar">
						</image>
					</view>


					<view style="display: flex;flex-direction: column;margin-left: 30rpx;">

						<text style="font-size: 0.8rem;">{{nickName  ? nickName:''}}</text>
						<text style="font-size: 0.7rem;margin-top: 10rpx;">{{formatDate(response.createTime)}}</text>

					</view>

				</view>

				<!-- -->
				<view>
					<button type="primary" size="mini" @click="addatt" v-if="attentiontotal==0">关注</button>

					<button type="primary" size="mini" @click="removeatt" v-else plain>已关注</button>
				</view>


			</view>

			<!-- -->

			<view style="margin-top: 40rpx;">
				<!-- {{response.content}} -->
				<!-- <zero-markdown-view :markdown="response.content"></zero-markdown-view> -->
				<markdown :source="response.content" style="margin-bottom: 20rpx;" />

				<view style="margin-top: 100rpx;"></view>

				<view style="display: flex;margin-top: 20rpx;" v-for="item in commList">
					<view style="width: 10%;">

						<view style="display: flex;align-items: center;">


							<image style="width: 40rpx;height: 40rpx;border-radius: 50%;"
								:src="baseUrl+ item.sysUser.avatar">
							</image>

						</view>

					</view>

					<!-- -->
					<view style="width: 90%;display: flex; flex-direction: column;">
						<div style="display: flex;text-align: left;">

							<div style="font-size: 0.8rem;color: #aaa;">{{ item.sysUser.nickName }}</div>
						</div>

						<div style="text-align: left;margin-top: 5rpx;font-size: 0.9rem;color: #000;">
							{{ item.content }}
						</div>

						<!-- -->
						<div style="display: flex;align-items: center;">

							<div style="text-align: left;color: #aaa; font-size: 0.8rem;">
								{{formatDate(item.createTime)}}
							</div>

							<div @click.stop="replayTalk(item,false)"
								style="display: flex;text-align: left;align-items: center;justify-content: center;margin-left: 15px;">

								<unicons type="chat" size="16" color="black"></unicons>

								<div style="font-size: 0.8rem;color: #434343;">回复</div>

							</div>


							<div style="margin-left: 15px;display: flex;" @click.stop="clickStar(item)">

								<uni-icons type="hand-up" size="16"
									:color="item.comStar==null ? '#000': '#1e80ff'"></uni-icons>
								<text class="badge" :style="{'color':item.comStar==null ? '#000': '#1e80ff'}">
									{{item.starNum ==0 ? '&nbsp;':item.starNum }}</text>

							</div>

							<!-- -->


						</div>



						<!-- child -->

						<view style="display: flex;margin-top: 20rpx;" v-for="child in item.comComm">
							<view style="width: 10%;">

								<image style="width: 40rpx;height: 40rpx;border-radius: 50%;"
									:src="baseUrl+ child.sysUser.avatar">
								</image>

							</view>

							<!-- -->
							<view style="width: 90%;display: flex; flex-direction: column;">
								<div style="display: flex;text-align: left;">

									<div v-if="child.sysUserRe != null" style="display: flex;align-items: center;">

										<div style="font-size: 0.8rem;color: #aaa;">{{ child.sysUserRe.nickName }}
										</div>

										<div style="margin: 0px 5px;font-size: 0.8rem;color: #141414;">@</div>

									</div>


									<div style="font-size: 0.8rem;color: #aaa;;display: flex;align-items: center;">
										{{ child.sysUser.nickName }}
									</div>

									<!-- <div style="font-size: 0.8rem;color: #434343;">{{ child.sysUser.nickName }}</div> -->
								</div>

								<div style="text-align: left;margin-top: 5rpx;font-size: 0.9rem;color: #262626;">
									{{ child.content }}
								</div>

								<!-- -->
								<div style="display: flex;align-items: center;">

									<div style="text-align: left;color: #aaa;font-size: 0.8rem;">
										{{formatDate(child.createTime)}}
									</div>

									<div @click.stop="replayTalk(item,true)"
										style="display: flex;text-align: left;align-items: center;justify-content: center;margin-left: 15px;">

										<unicons type="chat" size="16" color="black"></unicons>

										<div style="font-size: 0.8rem;color: #434343;">回复</div>

									</div>


									<div style="margin-left: 15px;display: flex;" @click.stop="clickStar(child)">

										<uni-icons type="hand-up" size="16"
											:color="child.comStar==null ? '#000': '#1e80ff'"></uni-icons>
										<text class="badge" :style="{'color':child.comStar==null ? '#000': '#1e80ff'}">
											{{child.starNum ==0 ? '&nbsp;':child.starNum }}</text>

									</div>

									<!-- -->

								</div>
							</view>

						</view>



					</view>




				</view>

				<!-- -->






				<!-- -->

			</view>



		</view>

		<view
			style="position: fixed; bottom: 0; width:100%;border: 1rpx solid #fafafa;height: 100rpx;background-color: #fafafa">


			<view style="display: flex;align-items: center;padding: 20rpx;justify-content: space-between;">

				<view style="width: 100%;margin-right: 50rpx;">

					<uni-easyinput ref="input" @blur="blur()" v-model="parContent" :inputBorder="false"
						class="custom-input" confirmType="send" @confirm="sendComm(response)"></uni-easyinput>

				</view>


				<view style="display: flex;align-items: center;">
					<view style="display: flex;flex-direction: column;">
						<view style="display: flex;flex-direction: row-reverse;">
							<text class="badge">{{ total ==0 ? '&nbsp;':total}}</text>
						</view>
						<unicons type="chat" size="30" color="black"></unicons>
					</view>

					<view style="display: flex;flex-direction: column;margin: 0rpx 30rpx;"
						@click.stop="handleButtonClick(response)">
						<view style="display: flex;flex-direction: row-reverse;">
							<text class="badge" :style="{'color':response.comStar==null ? '#000': '#1e80ff'}">
								{{response.starNum ==0 ? '&nbsp;':response.starNum }}</text>
						</view>
						<uni-icons type="hand-up" size="30"
							:color="response.comStar==null ? '#000': '#1e80ff'"></uni-icons>
					</view>


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
		getComm,
		delComm,
		addComm,
		updateComm
	} from "@/api/article/comcomm";
	import {
		addStar,
		getStar,
		delStar,
	} from "@/api/system/star";
	import {
		getFormatTime
	} from "@/utils/common.js";
	import markdown from "@/components/ua2-markdown/ua-markdown.vue";
	import unicons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
	import {
		listAttention,
		listFans,
		getAttention,
		delAttention,
		addAttention,
		updateAttention
	} from "@/api/system/attention";
	export default {
		components: {
			markdown,
			unicons
		},
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
				parContent: '',
				form: {
					content: null,
					userId: null,
					articleId: null,
					parId: null,
					replyId: null
				},
				commList: [],
				total: [],
				response: {},
				avatar: '',
				nickName: '',
				starform: {},
				formStar: {},
				replay: false,
				currentItem: {},
				childReplay: false,
				replay: false,
				queryattentionParams: {
					pageNum: 1,
					pageSize: 10,
					userId: null,
					userIdby: null,
				},
				attentionList: [],
				attentiontotal: 0,
				attentionform: {
					userId: null,
					userIdby: null,
				},

			};
		},
		onLoad(options) {
			this.item = JSON.parse(options.item);
			// alert(this.item.id)
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
			isStringNotEmpty(obj) {
				// return str !== null && str !== undefined && str !== '';
				return Object.keys(obj).length === 0 && Object.getOwnPropertyNames(obj).length === 0;
			},
			removeatt() {
				const ids = this.attentionList[0].id;
				delAttention(ids).then(response => {
					this.getattList();
				});
			},

			addatt() {
				this.attentionform.userId = this.$store.state.user.id;
				if (this.response == null) return
				this.attentionform.userIdby = this.response.sysUser.userId;

				addAttention(this.attentionform).then(response => {

					this.getattList();
				});
			},


			getattList() {
				this.queryattentionParams.userId = this.$store.state.user.id;
				if (this.response == null) return
				this.queryattentionParams.userIdby = this.response.sysUser.userId;

				listAttention(this.queryattentionParams).then(response => {
					this.attentionList = response.rows;
					this.attentiontotal = response.total;
				});

				// listFans(this.queryattentionParams).then(response => {
				//   // alert(JSON.stringify(response.rows))
				//   this.attentionFansList = response.rows;
				// });
			},

			blur() {
				this.$refs.input.focused = false;
				this.replay = false;
			},
			//回复
			replayTalk(item, replay) {
				console.log("replay");
				this.$refs.input.focused = true;
				this.replay = true;
				this.currentItem = item;
				this.childReplay = replay;
				console.log(this.currentItem);
				console.log(this.childReplay);
			},

			reset() {
				this.form = {
					parId: null,
					content: null,
					userId: null,
					articleId: null,
					createTime: null,
					updateTime: null
				};
				this.parContent = '';
			},

			sendComm() {
				if (this.replay) {
					this.sendComm1(this.currentItem, this.childReplay);
				} else {
					this.form.content = this.parContent;
					this.form.userId = this.$store.state.user.id;
					this.form.articleId = this.response.id;

					addComm(this.form).then(response => {
						this.getList();
						this.reset();
					});
				}

			},


			sendComm1(item, replay) {
				// alert('' + item)
				this.form.content = this.parContent;
				this.form.userId = this.$store.state.user.id;
				this.form.articleId = this.response.id;
				this.form.parId = item.id;
				if (replay) {
					this.form.content = this.parContent;
					console.log(item.userId);
					this.form.replyId = item.userId
				}

				addComm(this.form).then(response => {
					this.getList();
					this.reset();
				});
			},

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
					this.avatar = response.data.sysUser.avatar;
					this.nickName = response.data.sysUser.nickName;
					this.getList();
					this.getattList();
				});

			},
			resetStarform() {
				this.starform = {
					articleId: null,
					userId: null,
				};
			},

			handleButtonClick(item) {
				this.resetStarform();
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
						// alert(JSON.stringify(response))
						if (response.code == 200) {
							item.starNum = item.starNum - 1;
							item.comStar = null;
						}
					});

				}
			},

			resetformStar() {
				this.formStar = {
					commId: null,
					userId: null,
				};
			},

			clickStar(item) {
				// alert('click')
				this.resetformStar();
				this.formStar.commId = item.id;
				this.formStar.userId = this.$store.state.user.id;

				if (item.comStar == null) {
					addStar(this.formStar).then(response => {
						// alert(JSON.stringify(response))
						if (response.code == 200) {
							item.starNum = item.starNum + 1;
							item.comStar = {};
						}
					});
				} else {
					// this.ids = item.id;
					delStar(this.formStar).then(response => {
						// alert(JSON.stringify(response))
						if (response.code == 200) {
							item.starNum = item.starNum - 1;
							item.comStar = null;
						}
					});

				}
			},

		}
	}
</script>

<style lang="scss">
	.custom-input {
		outline: none;
		border-radius: 20rpx;
	}

	.badge {
		font-size: 0.3rem;
		margin-bottom: -20rpx;
		color: #000;
	}
</style>