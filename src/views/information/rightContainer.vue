<template>
	<el-tabs v-model="activeName" class="container">
		<el-tab-pane label="通知" name="notice">
			<div v-for="(item, i) in notices" class="notice">
				<div>{{item.content}}</div>
				<div style="text-align: right;">{{formatTime(new Date(item.date), '{y}-{m}-{d}')}}</div>
				<hr v-if="i != notices.length - 1" />
			</div>
		</el-tab-pane>
		<el-tab-pane label="点赞" name="like">
			<span slot="label"><el-badge :value="12" class="item" is-dot :hidden="newLike">点赞</el-badge></span>
			<zl-like :data="likes" @goDetail="goDetail"/>
		</el-tab-pane>
		<el-tab-pane label="回复" name="comment">
			<span slot="label"><el-badge :value="12" class="item" is-dot :hidden="newComment">回复</el-badge></span>
			<zl-comment :data="comments" @goDetail="goDetail"/>
		</el-tab-pane>
		<el-tab-pane label="关注" name="follow">
			<span slot="label"><el-badge :value="12" class="item" is-dot :hidden="newFollow">关注</el-badge></span>
			<zl-follow :data="follows"/>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import {
		formatTime
	} from '../../utils/index.js'
	import zlLike from './like.vue'
	import zlComment from './comment.vue'
	import zlFollow from './follow.vue'

	export default {
		components: {
			zlLike,
			zlComment,
			zlFollow
		},
		data() {
			return {
				activeName: 'notice',
				notices: [],
				likes: [],
				comments: [],
				follows: [],
				formatTime: formatTime,
				newLike: true,
				newComment: true,
				newFollow: true,
			};
		},
		watch:{
			activeName(nv,ov) {
				if(nv ==  'like') {
					this.newLike = true;
					localStorage.setItem(this.$store.getters['user/uId'] + 'lastLike', this.likes[0].id)
				}else if(nv ==  'comment') {
					this.newComment = true;
					localStorage.setItem(this.$store.getters['user/uId'] + 'lastComment', this.comments[0].id)
				}else if(nv ==  'follow') {
					this.newFollow = true;
					localStorage.setItem(this.$store.getters['user/uId'] + 'lastFollow', this.follows[0].id)
				}
			}
		},
		mounted() {
			this.getInformation();
		},
		methods: {
			goDetail() {
				console.log('go')
				this.$emit('goDetail')
			},
			async getInformation() {
				var infos = [];
				await this.$store.dispatch('user/getInformation', { tId: this.$store.getters['user/uId'] })
					.then((data) => {
						data = data.data;
						infos = data;
					})
					.catch((err) => {
						console.log(err);
					});
				let likes = [];
				let normals = [];
				let comments = [];
				let follows = [];
				infos.forEach((item, i) => {
					if(item.type == 'like') {
						likes.push(item);
					}else if(item.type == 'comment'){
						comments.push(item);
					}else if(item.type == 'follow'){
						follows.push(item);
					}else {
						normals.push(item);
					}
				})
				this.notices = normals;
				//最新的like信息的id与上次一样
				let lastLike = localStorage.getItem(this.$store.getters['user/uId'] + 'lastLike');
				if(!lastLike && likes.length || lastLike != likes[0].id) {
					this.newLike = false;
				}
				
				let lastComment = localStorage.getItem(this.$store.getters['user/uId'] + 'lastComment');
				if(!lastComment && comments.length || lastComment != comments[0].id) {
					this.newComment = false;
				}
				
				let lastFollow = localStorage.getItem(this.$store.getters['user/uId'] + 'lastFollow');
				if(!lastFollow && follows.length || lastFollow != follows[0].id) {
					this.newFollow = false;
				}
				
				// 过滤出like,这里可以优化，保存user
				this.$store.dispatch('user/getLikeInfo', likes)
					.then((data) => {
						likes = data.data;
						this.likes = likes;
					})
					.catch((err) => {
						console.log(err);
					});
				this.$store.dispatch('user/getCommentInfo', comments)
					.then((data) => {
						//console.log(data)
						comments = data.data;
						this.comments = comments;
					})
					.catch((err) => {
						console.log(err);
					});
				let userIds = follows.map((item) => {
					return item.uId;
				})
				this.$store.dispatch('user/getInfos', userIds)
					.then((data) => {
						data = data.data;
						follows = follows.map((item) => {
							item.user = data[item.uId];
							return item;
						})
						this.follows = follows;
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 14px;
	}

	.notice {
		>div:first-child {
			padding-bottom: 10px;
		}

		>div:nth-child(2) {
			color: #838383;
		}
	}

	hr {
		border: none;
		width: 100%;
		transform: scale(1.06);
		border-top: 1px dashed #cfcfcf;
	}
	.item {
		line-height: 2em;
		display: inline-block;
		padding: 0 5px;
	}
</style>
