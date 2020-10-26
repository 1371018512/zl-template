<template>
	<el-container class="main">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail @Refresh="getArts"/>
		</el-dialog>
		<!-- 以上是文章详情页 -->
		<el-aside width="600px">
			<zl-filter @filterCondition="getArts" />
			<zl-news v-for="(item, i) in news" :key='i' :news="news[i]" @goDetail="goDetail"/>
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
			/* news(newV) {
				console.log(newV)
			} */
		},
		provide() {
			return {
				news: this.news,
			};
		},
		mounted() {
			// 获取数据
			this.getArts();
		},
		data() {
			return {
				section: '',
				sort: '',
				DialogVisible: false,
				news: [],
				condition: '',
			};
		},
		methods: {
			getArts(condition) {
				if(condition) {
					this.condition = condition;
				} else {
					condition = this.condition;
				}
				
				console.log('now the filter condition is ' + condition);
				let that = this;
				new Promise(function(resolve, reject) {
					that.$store.dispatch('art/getArts', condition)
						.then((data) => {
							data = data.data;
							resolve(data);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}).then(function(news) {
					that.$store.dispatch('user/getLikes', { uId:that.$store.getters['user/uId'] })
						.then((data) => {
							let artLikes = data.data.artLikes;
							for(let i = 0;i < news.length;i ++) {
								if(artLikes.find((item) => {
									return item == news[i].art.id
								})) {
									news[i].art.iLike = true;
								}
							}
							that.news = news;
							console.log(news)
						})
						.catch((err) => {
							console.log(err);
						});
				})
				
				
				
			},
			goDetail(){
				this.DialogVisible = true
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
