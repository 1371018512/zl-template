<template>
	<el-tabs v-model="activeName" class="container">
		<el-tab-pane label="通知" name="notice">
			<div v-for="(item, i) in notices" class="notice">
				<div>{{item.content}}</div>
				<div style="text-align: right;">{{formatTime(new Date(item.date), '{y}-{m}-{d}')}}</div>
				<hr v-if="i != notices.length - 1" />
			</div>
		</el-tab-pane>
		<el-tab-pane label="赞" name="like">
			<zl-like :data="likes" @goDetail="goDetail"/>
		</el-tab-pane>
		<el-tab-pane label="回复" name="comment">
			<zl-comment :data="comments" @goDetail="goDetail"/>
		</el-tab-pane>
		<el-tab-pane label="关注" name="follow">
			<zl-follow :data="follow"/>
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
				follow: [{
					user: {
						uId: 992973331,
						introduction: '我是一个保安，爱吃小熊饼干',
						education: '本科',
						base: '杭州',
						sex: 0,
						belikes: 1100,
						becollects: 1001,
						codePass: 30,
						problemPass: 37,
						highquiltyOutput: 100,
						nickName: '今天也是没有收到offer的一天',
						school: '华侨大学',
						graduationYear: 2021,
						identity: {
							name: '字节跳动_Data_后端开发工程师',
							type: 'trainee',
						},
						direction: 'java工程师',
						userLevel: 6,
						profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
					},
					follow: {
						user: {
							base: '杭州',
							sex: 1,
							belikes: 1100,
							becollects: 1001,
							codePass: 30,
							problemPass: 37,
							highquiltyOutput: 100,
							identity: {
								name: '字节跳动_Data_后端开发工程师',
								type: 'trainee',
							},
							profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
							userLevel: 2,
							nickName: 'shining4code',
							school: '浙江大学',
							graduationYear: 2021,
							direction: '产品',
						},
						date: new Date(),
					},
					date: new Date(),
				}],
				formatTime: formatTime,
			};
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
						//console.log(data)
						infos = data;
					})
					.catch((err) => {
						console.log(err);
					});
				let likes = [];
				let normals = [];
				let comments = [];
				infos.forEach((item, i) => {
					if(item.type == 'like') {
						likes.push(item);
					}else if(item.type == 'comment'){
						comments.push(item);
					}else {
						normals.push(item);
					}
				})
				// 过滤出like,这里可以优化，保存user
				await this.$store.dispatch('user/getLikeInfo', likes)
					.then((data) => {
						//console.log(data)
						likes = data.data;
					})
					.catch((err) => {
						console.log(err);
					});
				await this.$store.dispatch('user/getCommentInfo', comments)
					.then((data) => {
						//console.log(data)
						comments = data.data;
					})
					.catch((err) => {
						console.log(err);
					});
				/* 				
				// 过滤出comments
				comments = await Promise.all(comments.map(async (item, i) => {
					let ans = { date: item.date, content: item.content, matherContent: item.matherContent};
					await this.$store.dispatch('user/getInfo', item.uId)
						.then((data) => {
							data = data;
							ans.user = data;
						})
						.catch((err) => {
							console.log(err);
						});
						
					await this.$store.dispatch('art/getArts', { aId: item.artId })
						.then((data) => {
							data = data.data;
							ans.art = data;
						})
						.catch((err) => {
							console.log(err);
						});
					await this.$store.dispatch('art/getComments', { commentIds: [item.commentId] })
						.then((data) => {
							data = data.data
							// console.log(item.commentId)
							// console.log(data)
							if(data.length) {
								data = data[0].comment;
								ans.comment = data;
							}
						})
						.catch((err) => {
							console.log(err);
						});
					
					return ans;
				})) */
				
				this.likes = likes;
				this.notices = normals;
				this.comments = comments;
				//console.log(comments)
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
</style>
