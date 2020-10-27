<template>
	<div class="container">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="我发布的帖子" name="publish"></el-tab-pane>
			<el-tab-pane label="我回复的帖子" name="reply"></el-tab-pane>
		</el-tabs>
		<zl-title :data="map[activeTab].title + `(${map[activeTab].data.length})`" size="16" />
		<div v-for="(item, i) in map[activeTab].data" class="art">
			<zl-art :data="item.art" :needTags="false" :needDate="true" :replaceContent="item.content" @click="goDetail(item)" />
			<hr v-if="i != map[activeTab].data.length - 1 " />
		</div>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue'
	import zlArt from '@/components/News/art.vue'

	export default {
		components: {
			zlTitle,
			zlArt
		},
		computed: {},
		watch: {

		},
		provide() {},
		mounted() {
			this.getMyArts();
			this.getArtsIcomment();
		},
		data() {
			return {
				activeTab: 'publish',
				map: {
					'publish': {
						title: '发布的帖子',
						data: []
					},
					'reply': {
						title: '回复的帖子',
						data: []
					},
				},
			}
		},
		methods: {
			onSubmit() {},
			getMyArts() {
				this.$store.dispatch('art/getArts', {
						uId: this.$store.getters['user/uId']
					})
					.then((data) => {
						data = data.data;
						this.map['publish'].data = data
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getArtsIcomment() {
				this.$store.dispatch('art/getArtsIcomment', {
						uId: this.$store.getters['user/uId']
					})
					.then((data) => {
						data = data.data;
						console.log('查询我评论过的文章')
						data.forEach((item, i) => {
							data[i].content = item.comment.content;
						})
						//console.log(data)
						this.map['reply'].data = data
					})
					.catch((err) => {
						console.log(err);
					});
			},
			goDetail(news) {
				//console.log(news)
				this.$store.commit('art/setUser', news.user)
				this.$store.commit('art/setArt', news.art)
				// 这里需要获取comments
				this.$store.dispatch('art/getComments', {
						commentIds: news.art.commentIds,
						sort: '',
					})
					.then((data) => {
						data = data.data;
						//console.log(data)
						this.$store.commit('art/setComments', data)
					})
					.catch((err) => {
						console.log(err);
					});
				//this.$store.commit('art/setComments', this.news.comments)
				//if(this.news.art)
				this.$emit('goDetail')
			},
		},
	}
</script>

<style scoped>
	.container {
		width: 100%;
	}

	.header {
		width: 100%;
		height: 50px;
		font-size: 15px;
		color: #6f6f6f;
	}

	hr {
		border: none;
		width: 100%;
		border-top: 1px solid #cfcfcf;
	}

	.artTitle {
		font-size: 14px;
	}

	.artContent {
		font-size: 13px;
		color: #888888;
		padding: 6px 3px;
	}

	.art {
		margin-top: 10px;
	}

	.green {
		color: #25bb9b;
		cursor: pointer;
	}
</style>
