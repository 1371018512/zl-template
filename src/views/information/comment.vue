<template>
	<div>
		<div v-for="(item, i) in data">
			<div class="comment">
				<div>
					<zl-profile :data="item.user" :size="50"></zl-profile>
				</div>
				<div class="detail">
					<!-- todo 这里的onlyName迟早去掉 -->
					<zl-name :data="item.user" :onlyName="true"/>
					回复：
					<span style="position: absolute;right: 0;">{{formatTime(new Date(item.date), '{y}-{m}-{d}')}}</span>
					<div class="content">{{item.content}}</div>
					<div class="innerContent" v-if="item.tContent" @click="goDetail(item)">
						我的评论: {{item.tContent}}
					</div>
					<div>
						来自
						<span @click="goDetail(item)" class="from">
							{{item.art.title ? '帖子: ' + item.art.title : '动态: ' + item.art.content}}
						</span>
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
		mounted: () => {
		},
		methods: {
			type(obj) {
				if(obj.art.title) {
					return "我的帖子: " + obj.art.title;
				} else if(obj.art) {
					return "我的动态: " + obj.art.content;
				} else {
					return "我的评论: " + obj.comment.content;
				}
			},
			async goDetail(ite) {
				await this.$store.commit('art/setUser', ite.user)
				
				await this.$store.commit('art/setArt', ite.art)
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
	.comment {
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
	
	.content {
		margin: 8px 0;
	}
	
	.innerContent:hover {
		color: #25bb9b;
		cursor: pointer;
	}
	.from:hover {
		color: #25bb9b;
		cursor: pointer;
	}
</style>
