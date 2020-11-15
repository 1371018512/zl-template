<template>
	<div class="container">
		<zl-title data="浏览历史"/>
		<div v-for="(item, i) in data" :key="item.id" class="info">
			<div class="title" @click="goDetail(item)">{{item.title}}</div>
			<div class="time">{{formatTime(new Date(item.date), '{y}-{m}-{d}')}}</div>
			<hr v-if="i < data.length - 1" />
		</div>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue';
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlName from '@/components/name/index.vue'
	import zlPersonalDetail from '@/components/Popovers/PersonalDetail.vue'
	import { formatTime } from '@/utils/index.js'
	
	export default {
		components: {
			zlTitle,
			zlProfile,
			zlName,
			zlPersonalDetail
		},
		props: {
			data: {},
		},
		computed: {
		},
		data() {
			return {
				formatTime: formatTime,
			}
		},
		methods: {
			async goDetail(item) {
				let user;
				let art;
				await this.$store.dispatch('user/getInfo', 
						item.uId
					)
					.then((data) => {
						user = data;
					})
					.catch((err) => {
					});
				await this.$store.dispatch('art/getArts', {
						aId: item.artId
					})
					.then((data) => {
						art = data.data;
					})
					.catch((err) => {
					});
				await this.$store.commit('art/setUser', user)
				await this.$store.commit('art/setArt', art)
				// 这里需要获取comments
				await this.$store.dispatch('art/getComments', {
						commentIds: this.$store.getters['art/art'].commentIds,
						sort: '',
					})
					.then((data) => {
						data = data.data;
						//console.log(data)
						this.$store.commit('art/setComments', data)
					})
					.catch((err) => {
						//console.log(err);
					});
				this.$emit('goDetail')
			},
		}
	}
</script>

<style scoped lang="scss">
	.info {
		padding: 5px 5px;
	}
	
	.container {
		font-size: 10px;
		width: 100%;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
		box-shadow: 0 0 5px #eeeeee;
		padding: 10px 20px 10px 10px;
	}
	
	.title {
		font-size: 15px;
		cursor: pointer;
		&:hover {
			color: #25bb9b;
		}
	}
	
	.time {
		color: #9e9e9e;
	}
	
	hr {
		border: none;
		border-top: 1px dashed #cfcfcf;
	}
</style>
