<template>
	<div>
		<div v-for="(item, i) in data">
			<div class="like">
				<div>
					<zl-profile :data="item.user" :size="50"></zl-profile>
				</div>
				<div class="detail">
					<!-- todo 这里的onlyName迟早去掉 -->
					<zl-name :data="item.user" :onlyName="true"></zl-name>
					点赞了
					<span style="position: absolute;right: 0;">{{formatTime(new Date(item.date), '{y}-{m}-{d}')}}</span>
					<div class="innerContent" @click="goDetail(item)">
						{{item.content}}
					</div>
					<div v-if="item.art">
						来自: {{item.art.title}}
					</div>
				</div>
			</div>
			<hr v-if="i != data.length - 1" />
		</div>
	</div>
</template>

<script>
	import {
		formatTime
	} from '../../utils/index.js'
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlName from '@/components/name/index.vue'
	
	export default {
		components: {
			zlProfile,
			zlName
		},
		props: {
			data: {},
		},
		data() {
			return {
				formatTime: formatTime,
				map: {
					
				}
			};
		},
		methods: {
			
			async goDetail(ite) {
				let art = ite.art;
				let user;
				await this.$store.dispatch('user/getInfo', ite.art.uId).then((data) => {
					user = data;
				}).catch(error => {
					console.log(error)
				})
	
				await this.$store.commit('art/setUser', user)
				await this.$store.commit('art/setArt', art)
				// 这里需要获取comments
				await this.$store.dispatch('art/getComments', {
						commentIds: ite.art.commentIds,
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
				//this.$store.commit('art/setComments', this.news.comments)
				//if(this.news.art)
				this.$emit('goDetail')
			},
		}
	}
</script>

<style scoped lang="scss">
	.like {
		display: flex;
		margin: 20px 0px;
	}
	
	hr {
		border: none;
		width: 100%;
		transform: scale(1.06);
		border-top: 1px dashed #cfcfcf;
	}
	
	.detail {
		color: #444444;
		position: relative;
		flex: 1;
		padding-left: 10px;
	}
	
	.innerContent {
		color: #838383;
		width: 100%;
		background-color: #f1f1f1;
		padding: 10px;
		margin: 5px;
	}
	
	.innerContent:hover {
		color: #25bb9b;
		cursor: pointer;
	}
</style>
