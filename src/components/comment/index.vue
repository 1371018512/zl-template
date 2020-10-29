<template>
	<div class="container2">
		<el-container>
			<el-aside width="50px" class="header-aside">
				<zl-profile :data="data.user" v-popover:popover1 />
				<el-popover :open-delay="600" ref="popover1" placement="bottom" title="" width="350" trigger="hover" content="">
					<zl-personal-detail :data="data.user" />
				</el-popover>
			</el-aside>
			<el-main class="header-main">
				<div>
					<div style="font-size: 10px;">
						<zl-name :data="data.user" />
					</div>
					<div>
						<el-tag type="info">#{{index + 1}}</el-tag>
					</div>
				</div>
				<div>
					{{data.comment.content}}
				</div>
				<div>
					<div>
						发表于{{formatTime(new Date(data.comment.date), '{y}-{m}-{d}')}}
					</div>
					<div>
						<span @click="likeComment">
							赞({{data.comment.likes}})
						</span>
						<span @click="openInputFn()">回复</span>
						<span>举报</span>
					</div>
				</div>
				<div class="recomments">
					<template v-for="(item, i) in data.recomments">
						<zl-recomment :data="item" @openInput="openInputFn" @publishRecomment="publishRecomment" />
						<hr v-if="i < data.recomments.length - 1" />
					</template>
					<!-- todo 这里默认不显示 -->
					<div class="inputContainer" v-show="openInput">
						<el-input ref="commentInput" placeholder="请输入你的观点" v-model="textarea" size="small" clearable>
						</el-input>
						<div style="display: flex;flex-direction: row-reverse;padding-top: 10px;">
							<el-button type="success" size="mini" @click="publishRecomment">回复</el-button>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>

	</div>
</template>

<script>
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlRecomment from './recomment.vue'
	import {
		formatTime
	} from '../../utils/index.js'
	import zlName from '@/components/name/index.vue'
	import {
		mapGetters
	} from 'vuex'
	import zlPersonalDetail from '../Popovers/PersonalDetail.vue'

	export default {
		name: 'comment',
		components: {
			zlProfile,
			zlRecomment,
			zlName,
			zlPersonalDetail
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
		},
		watch: {

		},
		props: {
			data: {},
			index: {},
			sort: {},
		},
		provide() {},
		mounted() {
			console.log(this.data)
		},
		data() {
			return {
				formatTime: formatTime,
				textarea: '',
				openInput: false,
				tId: this.data.comment.uId,
				// 被回复的评论content
				tContent: this.data.comment.content,
			}
		},
		methods: {
			openInputFn(tId, content) {
				this.openInput = !this.openInput;
				this.$nextTick(() => {
					this.$refs.commentInput.focus();
				})

				// 修改tId
				if (tId){
					this.tId = tId;
					this.tContent = content;
				}
				else {
					this.tId = this.data.comment.uId;
					this.tContent = this.data.comment.content;
				}
			},
			likeComment() {
				let that = this;
				this.$store.dispatch('user/likeComment', {
						uId: this.$store.getters['user/uId'],
						cId: this.data.comment.id,
					})
					.then((data) => {
						data = data.data;
						that.data.comment.likes += data;
						this.$forceUpdate();
					})
					.catch((err) => {
						console.log(err);
					});
			},
			publishRecomment() {
				this.$store.dispatch('art/submitComment', {
						uId: this.$store.getters['user/uId'],
						// 这个值根据回复按钮来
						tId: this.tId,
						tContent: this.tContent,
						content: this.textarea,
						ArtId: this.data.comment.ArtId,
						date: new Date(),
						motherId: this.data.comment.id,
					}).then((data) => {
						// 更新评论区
						this.$emit('commentsRefresh');

						this.$message({
							message: '成功发布回复',
							type: 'success',
							customClass: 'mzindex',
						});
						this.textarea = '';
						this.openInput = false;
					})
					.catch((e) => {
						console.log(e)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container2 {
		//background-color: yellow;
		//margin-top: 20px;
		line-height: 1em;
		border-bottom: 1px dashed #cfcfcf;
		margin-bottom: 5px;
	}

	.header-aside {
		background: transparent;
		padding: 10px;
	}

	.header-main {
		background: transparent;
		font-size: 10px;
		padding: 10px;

		> :first-child {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		> :nth-child(3) {
			display: flex;
			justify-content: space-between;
			padding: 10px 0;
			font-size: 10px;
			color: #939393;

			span {
				padding: 0 5px;
				color: #25bb9b;
				cursor: pointer;
			}
		}
	}

	.recomments {
		border-radius: 5px;
		background-color: #eff0f2;
		padding: 10px;
	}

	.inputContainer {
		padding: 5px 10px;
	}

	hr {
		transform: scale(1.03);
		border: none;
		border-top: 1px dashed #cfcfcf;
	}
</style>
