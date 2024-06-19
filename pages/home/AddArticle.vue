<template>
	<view>

		<view style="display: flex;flex-direction: column;margin: 20rpx;">

			<view v-if="form.comId!=5" style="display: flex;background-color: #fff;padding: 20rpx;border-radius: 20rpx;">

				<textarea v-model="form.title" style="flex: 1;height: 50rpx;padding: 10rpx;border: 1rpx solid #fff;
				border-radius: 10rpx;" placeholder="请输入标题"></textarea>

			</view>


			<view style="display: flex;flex-direction: column;
			background-color: #fff;padding: 20rpx;border-radius: 20rpx;margin-top: 20rpx;">

				<view style="height: 200rpx">
					<textarea v-model="form.content" style="flex: 1;padding: 10rpx;border: 1rpx solid #fff;
				border-radius: 10rpx;" placeholder="请输入内容"></textarea>
				</view>

				<view>
					<uni-file-picker limit="1" fileMediatype="image" sizeType="compressed" @select="select"
						@progress="progress" @success="success" @fail="fail"></uni-file-picker>
				</view>

			</view>


		</view>
		<view class="bottom-button-container">
			<button type="primary" style="width: 80%;margin-bottom: 60rpx;" @click="submit">发布</button>
		</view>
	</view>
</template>

<script>
	import {
		toast
	} from '../../utils/common';
	import storage from '@/utils/storage'
	import config from '@/config';
	import {
		addArticle
	} from "@/api/article/article";
	export default {
		data() {
			return {
				title: '',
				type: 0,
				baseUrl: config.baseUrl,
				token: this.$store.state.user.token,
				form: {
					title: '',
					content: '',
					imageurl: '',
					comId: 0,
				},
			};
		},
		onLoad(options) {
			this.type = options.type;
			this.form.comId = this.type;
			setTimeout(() => {
				this.updatePageTitle();
			}, 500);

		},
		methods: {
			reset() {
				this.form = {
					title: '',
					content: '',
					imageurl: '',
					comId: 0,
				};
			},
			updatePageTitle() {
				switch (Number(this.type)) {
					case 0:
						this.title = "后端";
						break;
					case 1:
						this.title = "前端";
						break;
					case 2:
						this.title = "移动端";
						break;
					case 3:
						this.title = "其他";
						break;

					case 5:
						this.title = "热议";
						break;

				}

				uni.setNavigationBarTitle({
					title: this.title
				});
			},

			addArticle() {
				this.form.content = this.form.content + "![](" + this.form.imageurl + ")"
				addArticle(this.form).then(response => {

					toast(response.msg + ",请耐心等待审核!");
					uni.navigateBack();
					if (response.code == 200) {
						this.reset()
					}

				});

			},
			submit() {
				console.log(this.form);
				if (this.form.comId != 5) {
					if (this.isEmpty(this.form.title) ||
						this.isEmpty(this.form.content) || this.isEmpty(this.form.imageurl)) {
						toast("请输入标题或内容并上传图片!");
						return
					}
				} else {
					if (this.isEmpty(this.form.content) || this.isEmpty(this.form.imageurl)) {
						toast("请输入标题或内容并上传图片!");
						return
					}else{
						this.form.title=this.form.content.substring(0,10);
					}
				}

				uni.showModal({
					title: '提示',
					content: '确认发布吗?',
					success: (res) => {
						if (res.confirm) {
							this.addArticle();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},


			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
				console.log('token：' + this.token)


				const tempFilePaths = e.tempFilePaths;

				// 处理每张选中的图片
				tempFilePaths.forEach(tempFilePath => {
					uni.uploadFile({
						url: this.baseUrl + '/common/upload',
						filePath: tempFilePath,
						// 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
						name: 'file',
						header: {
							// 'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + this.token
						},
						// 成功函数
						success: (res) => {
							console.log('上传成功', res);
							// uni.uploadFile返回来的结果默认是JSON格式字符串，需要用JSON.parse转换成js对象
							console.log('上传数据转换', JSON.parse(res.data));
							let uploaddata = JSON.parse(res.data)
							this.form.imageurl = uploaddata.url;
						},
						// 失败提示用户重新上传  
						fail: error => {
							console.log('失败', error);
						}
					})
				});

			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},

			isEmpty(str) {
				if (!str || str == "undefined" || str == "null") {
					return true;
				}
				return false;
			}

		}
	}
</script>

<style lang="scss">
	.bottom-button-container {
		/* 指定按钮容器位于页面底部 */
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		/* 居中对齐按钮 */
		display: flex;
		justify-content: center;
		align-items: center;
		/* 可选：给容器一点高度，以便按钮不紧贴底部边缘 */
		height: 120rpx;
		/* 背景颜色或透明度等自定义样式 */
		background-color: rgba(0, 0, 0, 0);
	}

	.bottom-button {
		/* 根据需要调整按钮的样式 */
		width: 80%;
		/* 按钮宽度，可根据需要调整 */
		height: 40px;
		margin-bottom: 20px;
		/* 按钮高度 */
		color: #ffffff;
		/* 文字颜色 */
		background-color: #007aff;
		/* 按钮背景色 */
		border-radius: 5px;
		/* 圆角 */
	}
</style>