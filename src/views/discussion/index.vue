<template>
	<el-container class="main">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail @Refresh="getArts" />
		</el-dialog>
		<!-- 以上是文章详情页 -->
		<el-aside width="600px">
			<zl-filter @filterCondition="getArts" />
			<zl-news v-for="(item, i) in news" :key='item.art.id' :news="news[i]" @goDetail="goDetail" />
		</el-aside>
		<el-main>
			<zl-history :data="histories" @goDetail="goDetail"/>
		</el-main>
	</el-container>
</template>

<script>
	import zlNews from '@/components/News/index.vue'
	import zlArtDetail from '@/views/artDetail/index.vue'
	import zlFilter from '@/components/filter/index.vue'
	import zlHistory from './history.vue'

	export default {
		name: 'home',
		components: {
			zlNews,
			zlArtDetail,
			zlFilter,
			zlHistory
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
			this.getHistory();
		},
		data() {
			return {
				section: '',
				sort: '',
				DialogVisible: false,
				news: [],
				condition: '',
				histories: [],
			};
		},
		methods: {
			getArts(condition) {
				if (condition) {
					this.condition = condition;
				} else {
					condition = this.condition;
				}

				console.log('now the filter condition is ' + condition);
				this.$store.dispatch('art/getArts', condition)
					.then((data) => {
						data = data.data;
						this.news = data;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getHistory() {
				this.$store.dispatch('art/getArtHistory', {
					uId: this.$store.getters['user/uId'],
				})
					.then((data) => {
						this.histories = data.data;
						console.log(data)
					})
					.catch((err) => {
						console.log(err);
					});
			},
			goDetail() {
				this.DialogVisible = true
				//console.log(this.$store.getters['art/art'])
				this.$store.dispatch('art/submitArtHistory', {
					title: this.$store.getters['art/art'].title,
					uId: this.$store.getters['user/uId'],
					artId: this.$store.getters['art/art'].id,
					authorId: this.$store.getters['art/art'].uId
				})
					.then((data) => {
						data = data.data;
						console.log(data)
						//this.news = data;
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
