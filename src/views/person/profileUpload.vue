<template>
	<div>
		<div class="buttons">
			<input type="file" :value="imgFile" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
			<el-button @click="changeScale(1)" size="small">+</el-button>
			<el-button @click="changeScale(-1)" size="small">-</el-button>
			<el-button @click="down('blob')" size="small">↓</el-button>
			<el-button @click="finish()" size="small">确认上传</el-button>
		</div>
		<div class="container">
			<vue-cropper class="cropper" ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
			 :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original"
			 :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"
			 @realTime="realTime" @imgLoad="imgLoad"></vue-cropper>
			<div class="show-preview">
				<div :style="previews.div" class="preview">
					<img :src="previews.url" :style="previews.img">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		components: {},
		computed: {

		},
		watch: {

		},
		provide() {
			return {};
		},
		mounted() {},
		data() {
			return {
				headImg: '',
				//剪切图片上传
				crap: false,
				previews: {},
				option: {
					img: '',
					outputSize: 1, //剪切后的图片质量（0.1-1）
					full: false, //输出原图比例截图 props名full
					outputType: 'png',
					canMove: true,
					original: false,
					canMoveBox: true,
					autoCrop: true,
					autoCropWidth: 150,
					autoCropHeight: 150,
					fixedBox: true
				},
				fileName: '', //本机文件地址
				downImg: '#',
				imgFile: '',
				uploadImgRelaPath: '', //上传后的图片的地址（不带服务器域名）
				fileinfo: {},
			};
		},
		provide() {
			return {};
		},
		methods: {
			uploadImg(e, num) {
				console.log('uploadImg');
				var _this = this;
				//上传图片 
				var file = e.target.files[0]
				_this.fileName = file.name;
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
					return false
				}
				var reader = new FileReader();
				reader.onload = (e) => {
					let data;
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要 
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
					}
					if (num === 1) {
						_this.option.img = data
					} else if (num === 2) {
						_this.example2.img = data
					}
				}
				// 转化为base64 
				// reader.readAsDataURL(file) 
				// 转化为blob 
				reader.readAsArrayBuffer(file);

			},
			changeScale(num) {
				console.log('changeScale')
				num = num || 1;
				this.$refs.cropper.changeScale(num);
			},
			//下载图片
			down(type) {
				console.log('down')
				var aLink = document.createElement('a')
				aLink.download = 'author-img'
				if (type === 'blob') {
					this.$refs.cropper.getCropBlob((data) => {
						this.downImg = window.URL.createObjectURL(data)
						aLink.href = window.URL.createObjectURL(data)
						aLink.click()
					})
				} else {
					this.$refs.cropper.getCropData((data) => {
						this.downImg = data;
						aLink.href = data;
						aLink.click()
					})
				}
			},
			// 实时预览函数
			realTime(data) {
				this.previews = data
			},
			//选择本地图片
			uploadImg(e, num) {
				console.log('uploadImg');
				var _this = this;
				//上传图片 
				var file = e.target.files[0]
				_this.fileName = file.name;
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
					return false
				}
				var reader = new FileReader();
				reader.onload = (e) => {
					let data;
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要 
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
					}
					if (num === 1) {
						_this.option.img = data
					} else if (num === 2) {
						_this.example2.img = data
					}
				}
				// 转化为base64 
				// reader.readAsDataURL(file) 
				// 转化为blob 
				reader.readAsArrayBuffer(file);

			},
			imgLoad(msg) {
				console.log('imgLoad')
				console.log(msg)
			},
			//上传图片（点击上传按钮）
			finish(type) {
				this.$emit('uploaded');
				console.log('finish')

				if (type === 'blob') {
					// 
				} else {
					this.$refs.cropper.getCropData((data) => {
						this.modelSrc = data;

						//先将显示图片地址清空，防止重复显示
						this.option.img = ''

						//将剪裁后base64的图片转化为file格式
						let file = this.convertBase64UrlToBlob(data)
						file.name = this.fileName
						
						console.dir(file);
						
						this.$store.dispatch('user/modifyProfile', file)
						  .then(() => {
						  })
						  .catch(() => {
						  })
					})
				}
			},
			convertBase64UrlToBlob(urlData) {
				let bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
				//处理异常,将ascii码小于0的转换为大于0
				let ab = new ArrayBuffer(bytes.length);
				let ia = new Uint8Array(ab);
				for (var i = 0; i < bytes.length; i++) {
					ia[i] = bytes.charCodeAt(i);
				}
				return new Blob([ab], {
					type: 'image/jpeg'
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.cropper {
		width: 260px;
		height: 260px;
	}

	.show-preview {
		width: 150px;
		height: 150px;
		overflow: hidden;
		margin: 5px;

		.preview {
			overflow: hidden;
			border-radius: 50%;
			border: 1px solid #cccccc;
			background: #cccccc;
		}
	}

	.container,
	.buttons {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10px;
	}
</style>
