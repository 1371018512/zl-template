<template>
	<el-container class="main">
		<!-- <el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail />
		</el-dialog> -->
		<!-- 以上是文章详情页 -->
		<el-aside width="600px">
			<zl-post />
			<zl-news v-for="(item, i) in news" :news="news[i]" :index="i" :key='item.art.id' />
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
		mounted() {
			this.getBlinks();
			this.getRecommandUsers();
		},
		data() {
			return {
				DialogVisible: false,
				user: [],
				news: []
			};
		},
		methods: {
			getBlinks() {
				let uIds = [].concat(this.$store.getters['user/userDetail'].followIds);
				uIds.push(this.$store.getters['user/uId'])
				this.$store.dispatch('art/getBlinks', uIds)
					.then((data) => {
						data = data.data;
						this.news = data;
					})
					.catch((err) => {
						console.log(err);
					});
			
			},
			getRecommandUsers() {
				this.$store.dispatch('user/getinfosBysth', {
						limit: 5,
						by: 'score',
						uId: this.$store.getters['user/uId'],
					})
					.then((data) => {
						this.user = data.data;
					})
					.catch((err) => {
						console.log(err);
					});
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
