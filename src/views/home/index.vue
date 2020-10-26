<template>
	<el-container class="main">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail />
		</el-dialog>
		<!-- 以上是文章详情页 -->
		<el-aside width="600px">
			<zl-post />
			<!-- <zl-news v-for="(item, i) in news" :index="i" :key='i' /> -->
		</el-aside>
		<el-main>
			<zl-recommand :data="user" />
		</el-main>
	</el-container>
</template>

<script>
	import zlNews from '@/components/News/index.vue'
	import zlArtDetail from '@/views/artDetail/index.vue'
	import zlPost from './post.vue'
	import zlRecommand from './recommand.vue'

	export default {
		name: 'home',
		components: {
			zlNews,
			zlArtDetail,
			zlPost,
			zlRecommand
		},
		computed: {

		},
		watch: {

		},
		provide() {
			return {
				news: this.news,
			};
		},
		mounted() {},
		data() {
			return {
				DialogVisible: false,
				user: [{
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
					direction: 'java工程师',
					identity: {
						name: '字节跳动_Data_后端开发工程师',
						type: 'trainee',
					},
					userLevel: 6,
					profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
				}, {
					uId: 992973332,
					introduction: '我是一个保安，爱吃小熊饼干',
					education: '本科',
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
				}],
				news: [{
					user: {
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
						direction: 'java工程师',
						identity: {
							name: '字节跳动_Data_后端开发工程师',
							type: 'trainee',
						},
						userLevel: 6,
						profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
					},
					art: {
						title: '网易互联网面试是否可推迟',
						content: `
rt，网易云笔试挂了，被转推到其他部门（企业研发部门），可能是因为提前批面到了hr。
本来约的18号下午面试，现因个人原因（家庭变故）无法参加，时间和个人状态都不行，不知道能不能延迟一周时间。
公众号后台已经问过了还没回应，如果实在不行就放弃了。秋招也结束了。

其实有点自暴自弃，但是，对不起。`,
						tag: [
							'网易互联网',
						],
						topic: [
							'网易',
							'面试'
						],
						date: new Date(),
						lastModify: new Date(),
						likes: 2,
						collects: 0,
						comments: ['', '', '', '', '', ''],
						views: 1126,
						forwards: 0,
					},
					date: new Date(),
				}, {
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
				}, {
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
					blink: {
						content: `
打卡测试！`,
						date: new Date(),
						likes: 2,
						comments: [{
							id: 1,
							user: {
								artId: 1,
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
							target: {
								sex: 0,
								belikes: 1100,
								becollects: 1001,
								codePass: 30,
								problemPass: 37,
								highquiltyOutput: 100,
								nickName: '今天也是没有收到offer的一天',
								school: '华侨大学',
								graduationYear: 2021,
								direction: 'java工程师',
								identity: {
									name: '字节跳动_Data_后端开发工程师',
									type: 'trainee',
								},
								userLevel: 6,
								profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
							},
							content: '啊，老姐之前不是都到hr面了？',
							date: new Date(),
							recomments: [{
									id: 2,
									user: {
										sex: 0,
										belikes: 1100,
										becollects: 1001,
										codePass: 30,
										problemPass: 37,
										highquiltyOutput: 100,
										nickName: '今天也是没有收到offer的一天',
										school: '华侨大学',
										graduationYear: 2021,
										direction: 'java工程师',
										identity: {
											name: '字节跳动_Data_后端开发工程师',
											type: 'trainee',
										},
										userLevel: 6,
										profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
									},
									target: {
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
									content: '对啊对啊',
									date: new Date(),
									recomments: [],
									likes: 1,
									motherId: 1, //id != motherid的后续回复添加到mother上
								}],
							likes: 1,
							motherId: 1,
						}, ],
						views: 1126,
						forwards: 0,
					},
					date: new Date(),
				}]
			};
		},
		methods: {}
	}
</script>

<style scoped>
	.main {
		padding-top: 60px;
		flex-basis: 700px;
		max-width: 980px;
	}
</style>
