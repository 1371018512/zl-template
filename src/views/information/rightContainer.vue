<template>
	<el-tabs v-model="activeName" class="container">
		<el-tab-pane label="通知" name="notice">
			<div v-for="(item, i) in notices" class="notice">
				<div>{{item.content}}</div>
				<div style="text-align: right;">{{formatTime(item.date)}}</div>
				<hr v-if="i != notices.length - 1" />
			</div>
		</el-tab-pane>
		<el-tab-pane label="赞" name="like">
			<zl-like :data="likes"/>
		</el-tab-pane>
		<el-tab-pane label="回复" name="comment">
			<zl-comment :data="comments"/>
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
				notices: [{
					content: '还记得你参与的offer投票选择吗？现在已在大家的投票努力下出结果啦！',
					date: new Date(),
				}, {
					content: '还记得你参与的offer投票选择吗？现在已在大家的投票努力下出结果啦！',
					date: new Date(),
				}],
				likes: [{
					user: {
						// ...
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						nickName: 'shining4code',
					},
					art: {
						// ...
						// 文章显示title，动态和评论显示content
						title: '网易互联网面试是否可推迟',
					},
					date: new Date(),
				}, {
					user: {
						// ...
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						nickName: 'shining4code',
					},
					blink: {
						// ...
						content: '今天心情好啊，早饭要吃饱啊',
					},
					date: new Date(),
				}, {
					user: {
						// ...
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						nickName: 'shining4code',
					},
					comment: {
						// ...
						content: '啊，老姐之前不是都到hr面了？',
						// 下面是额外加的
						art: {
							// ...
							// 文章显示title，动态和评论显示content
							title: '网易互联网面试是否可推迟',
						}
					},
					date: new Date(),
				}],
				comments: [{
					user: {
						// ...
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						nickName: 'shining4code',
					},
					content: '我对文章评论一下',
					art: {
						// ...
						// 文章显示title，动态和评论显示content
						title: '网易互联网面试是否可推迟',
					},
					date: new Date(),
				}, {
					user: {
						// ...
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						nickName: 'shining4code',
					},
					content: '啥秘密哦？',
					comment: {
						content: '告诉你个秘密'
					},
					art: {
						// ...
						// 文章显示title，动态和评论显示content
						title: '网易互联网面试是否可推迟',
					},
					date: new Date(),
				}],
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
		methods: {

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
