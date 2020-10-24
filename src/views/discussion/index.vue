<template>
	<el-container class="main">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail/>
		</el-dialog>
		<!-- 以上是文章详情页 -->
		<el-aside width="600px">
			<zl-filter @filterCondition="getArts"/>
			<zl-news v-for="(item, i) in news" :index="i" :key='i' />
		</el-aside>
		<el-main>
			main
		</el-main>
	</el-container>
</template>

<script>
	import zlNews from '@/components/News/index.vue'
	import zlArtDetail from '@/views/artDetail/index.vue'
	import zlFilter from '@/components/filter/index.vue'
	
	export default {
		name: 'home',
		components: {
			zlNews,
			zlArtDetail,
			zlFilter
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
			// 获取数据
		},
		data() {
			return {
				section: '',
				sort: '',
				DialogVisible: false,
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
				}],
			};
		},
		methods: {
			getArts(condition) {
				
			}
		}
	}
</script>

<style scoped>
	.main {
		padding-top: 60px;
		flex-basis: 700px;
		max-width: 980px;
	}
</style>
