<template>
	<el-container class="main">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="0">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
				  <use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['artDetail/art'].title}}</span>
			</template>
			<zl-art-detail/>
		</el-dialog>
		<el-button type="text" @click="DialogVisible = true">点击打开 Dialog</el-button>
		<!-- 以上是文章详情页 -->
		<el-aside width="600px">
			<zl-news v-for="(item, i) in news" :index="i" :key='i' />
		</el-aside>
		<el-main>Main</el-main>
	</el-container>
</template>

<script>
	import zlNews from '../../components/News/index.vue'
	import zlArtDetail from '@/views/artDetail/index.vue'
	
	export default {
		name: 'home',
		components: {
			zlNews,
			zlArtDetail,
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
		mounted() {
		},
		data() {
			return {
				DialogVisible: false,
				news: [{
					user: {
						sex: 0,
						belikes: 1100,
						becollects: 1001,
						codePass: 30,
						problemPass: 37,
						highquiltyOutput: 100,
						userName: '今天也是没有收到offer的一天',
						school: '华侨大学',
						graduationYear: 2021,
						direction: 'java工程师',
						badgeList: [{
							name: '字节跳动_Data_后端开发工程师(准入职)',
							type: 'trainee',
						}, ],
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
						comments: {
							length: 6,
							data: ['', '', '', '', '', ''],
						},
						views: 1126,
					},
					date: new Date(),
				}, {
					user: {
						sex: 0,
						belikes: 1100,
						becollects: 1001,
						codePass: 30,
						problemPass: 37,
						highquiltyOutput: 100,
						userName: '今天也是没有收到offer的一天',
						school: '华侨大学',
						graduationYear: 2021,
						badgeList: [{
							name: '字节跳动_Data_后端开发工程师(准入职)',
							type: 'trainee',
						}, ],
						direction: 'java工程师',
						userLevel: 6,
						profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
					},
					follow: {
						user: {
							sex: 1,
							belikes: 1100,
							becollects: 1001,
							codePass: 30,
							problemPass: 37,
							highquiltyOutput: 100,
							badgeList: [{
								name: '字节跳动_Data_后端开发工程师(准入职)',
								type: 'trainee',
							}, ],
							profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
							userLevel: 2,
							userName: 'shining4code',
							school: '浙江大学',
							graduationYear: 2021,
							direction: '产品',
						},
						date: new Date(),
					},
					date: new Date(),
				}]
			};
		},
		methods: {
		}
	}
</script>

<style scoped>
	.main {
		padding-top: 60px;
		flex-basis: 700px;
		max-width: 950px;
	}
</style>
