<template>
	<div class="container">
		<el-container>
			<el-aside width="60px" class="profileContainer">
				<zl-profile2 :data="news.user" v-popover:popover1 />
				<el-popover ref="popover1" placement="bottom" title="" width="350" trigger="hover" content="" :open-delay="600">
					<zl-personal-detail
						:index="index"
						:data="news.user"
					/>
				</el-popover>
			</el-aside>
			<el-container>
				<el-header class="title" height="35px">
					<zl-title :news="news"/>
				</el-header>
				<el-main class="art-body">
					<zl-art v-if="news.art" :data="news.art" @click="goDetail"/>
					<zl-follow :index="index" :data="news" v-else-if="news.follow" />
					<zl-blink v-else :data="news.blink"/>
				</el-main>
			</el-container>
		</el-container>
		<div class="buttons" v-if="!news.follow">
			<div :class="{ 'active': this.entity.iLike }" @click="likeArt">
				<span :class="{ 'iconfont': true}">&#xe71a;</span> {{this.entity.likes}}
				<span>|</span>
			</div>
			<div  @click="commentClick">
				<span class="iconfont">&#xe683;</span> {{this.entity.commentIds.length}}
				<span>|</span>
			</div>
			<div>
				<span class="iconfont">&#xe600;</span> {{this.entity.forwards}}
				<span>|</span>
			</div>
			<div>
				<span class="iconfont">&#xe7df;</span>
			</div>
		</div>
		<div class="comments" v-if="news.blink" v-show="openComment">
			<div v-for="(item, i) in news.blink.comments">
				<zl-comment :data="item" :index="i" :key="i"/>
				<hr v-if="news.blink.comments.length - 1 != i" />
			</div>
			<hr/>
			<div style="margin: 10px;height: 90px;">
				<el-input type="textarea" v-model="commentContent" placeholder="请在这里添加你的回帖吧"></el-input>
				<div class="button">
					<el-button type="primary" size="small">发布</el-button>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import zlProfile2 from '../Profile/profile2.vue'
	import zlTitle from './title.vue'
	import zlArt from './art.vue'
	import zlFollow from './follow.vue'
	import zlPersonalDetail from '../Popovers/PersonalDetail.vue'
	import zlBlink from './blink.vue'
	import zlComment from '@/components/comment/index.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {
			zlProfile2,
			zlTitle,
			zlArt,
			zlFollow,
			zlPersonalDetail,
			zlBlink,
			zlComment,
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			entity() {
				if(this.news.art) {
					return this.news.art;
				}else {
					return this.news.blink;
				}
			}
		},
		mounted() {
			
		},
		watch: {
		},
		//inject: ['news'],
		props: {
			index: {
				type: Number,
				default: 0,
			},
			news: {
			}
		},
		data() {
			return {
				commentContent: '',
				openComment: false,
			};

		},
		methods: {
			commentClick() {
				this.openComment = !this.openComment;
				if(this.news.art) {
					this.goDetail();
				}
			},
			goDetail() {
				console.log(this.news.comments)
				this.$store.commit('art/setUser', this.news.user)
				this.$store.commit('art/setArt', this.news.art)
				// 这里需要获取comments
				this.$store.dispatch('art/getComments', {
						commentIds: this.news.art.commentIds,
						sort: '',
					})
					.then((data) => {
						data = data.data;
						console.log(data)
						this.$store.commit('art/setComments', data)
					})
					.catch((err) => {
						console.log(err);
					});
				//this.$store.commit('art/setComments', this.news.comments)
				//if(this.news.art)
				this.$emit('goDetail')
			},
			likeArt() {
				this.entity.iLike = !this.entity.iLike;
				this.$store.dispatch('user/likeArt', {
					uId: this.$store.getters['user/uId'],
					aId: this.entity.id,
				})
					.then((data) => {
						data = data.data;
						this.entity.likes += data;
						console.log(data)
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped lang="scss">
	.button {
		margin-top: 10px;
		float: right;
	}
	hr {
		border: none;
		border-top: 1px dashed #cfcfcf;
	}
	
	.comments {
		width: 100%;
		overflow-y: auto;
		border-top: 1px solid #dfdfdf;
	}
	
	.comment {
		 background-color: yellow;
	}
	
	.container {
		width: 100%;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
		margin-top: 13px;
		box-shadow: 0 0 5px #eeeeee;
	}

	.profileContainer {
		padding: 5px;
		display: flex;
		background-color: transparent;
		justify-content: center;
		height: 50px;
	}

	.title {
		height: 35px;
		padding-left: 5px;
	}

	.art-body {
		padding: 0 20px 0 5px;
	}
	
	.buttons {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #dfdfdf;
		> div {
			color: #b0b0b0;
			flex: 1;
			cursor: pointer;
			position: relative;
			text-align: center;
			> span:nth-child(2) {
				right: 0;
				position: absolute;
				color: #dfdfdf;
			}
			&:hover {
				color: #25bb9b;
			}
		}
	}
	
	.active {
		color: #25bb9b !important;
	}
</style>
