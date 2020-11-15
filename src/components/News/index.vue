<template>
	<div class="container" v-clickoutside="clickoutside">
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
					<!-- <zl-follow :index="index" :data="news" v-else-if="news.follow" /> -->
					<!-- <zl-blink v-else :data="news.blink"/> -->
				</el-main>
			</el-container>
		</el-container>
		<div class="buttons">
			<div :class="{ 'active': this.myLike }" @click="likeArt">
				<span :class="{ 'iconfont': true}">&#xe71a;</span> {{this.entity.likes}}
				<span>|</span>
			</div>
			<div @click="commentClick">
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
		<div class="comments" v-if="!news.art.title" v-show="openComment">
			<div v-for="(item, i) in news.art.comments">
				<zl-comment :data="item" :index="i" :key="item.comment.id" @commentsRefresh="commentsRefresh"/>
				<!-- <hr v-if="news.art.comments.length - 1 != i" /> -->
			</div>
			<div style="margin: 10px;height: 90px;">
				<el-input type="textarea" v-model="commentContent" placeholder="请在这里添加你的回帖吧"></el-input>
				<div class="button">
					<el-button type="primary" size="small" @click="publishComment">发布</el-button>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import zlProfile2 from '../Profile/profile2.vue'
	import zlTitle from './title.vue'
	import zlArt from './art.vue'
	//import zlFollow from './follow.vue'
	import zlPersonalDetail from '../Popovers/PersonalDetail.vue'
	//import zlBlink from './blink.vue'
	import zlComment from '@/components/comment/index.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {
			zlProfile2,
			zlTitle,
			zlArt,
			//zlFollow
			zlPersonalDetail,
			//zlBlink,
			zlComment,
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			entity() {
				return this.news.art;
			},
			myLike() {
				let arr;
				if(this.news.art) {
					arr = this.$store.getters['user/artLikes'];
					return arr.find((item) => {
						return this.entity.id == item;
					});
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
			commentsRefresh() {
				this.$store.dispatch('art/getComments', {
					commentIds: this.news.art.commentIds,
					sort: '',
				})
					.then((dat) => {
						dat = dat.data;
						console.log(dat)
						//this.$store.commit('art/setComments', data)
						this.news.art.comments = dat;
						this.$forceUpdate();
					})
					.catch((err) => {
						console.log(err);
					});
			},
			publishComment() {
				console.log('尝试上传回复');
				this.$store.dispatch('art/submitComment', {
					uId: this.$store.getters['user/uId'],
					tId: this.news.art.uId,
					content: this.commentContent,
					ArtId: this.news.art.id,
					date: new Date(),
				})
					.then((data) => {
						this.news.art.commentIds.push(data.data.id);
						this.commentContent = '';
						this.commentsRefresh();
					})
					.catch((e) => {
						console.log(e)
					})
			},
			commentClick() {
				// this.openComment = !this.openComment;
				if(this.openComment) {
					this.openComment = false;
					return;
				}
				else if(!this.openComment && !this.news.art.title) {
					this.$store.dispatch('art/getComments', {
						commentIds: this.news.art.commentIds,
						sort: '',
					})
						.then((data) => {
							data = data.data;
							console.log(data)
							//this.$store.commit('art/setComments', data)
							this.news.art.comments = data;
							this.openComment = !this.openComment;
						})
						.catch((err) => {
							console.log(err);
						});
				}
				if(this.news.art.title) {
					this.goDetail();
				}
			},
			async goDetail() {
				//console.log(this.news.comments)
				await this.$store.commit('art/setUser', this.news.user)
				await this.$store.commit('art/setArt', this.news.art)
				// 这里需要获取comments
				await this.$store.dispatch('art/getComments', {
						commentIds: this.news.art.commentIds,
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
			likeArt() {
				if(this.news.art) {
					this.$store.commit('user/toggleArtLike',this.news.art.id);
				}
				
				this.$store.dispatch('user/likeArt', {
					uId: this.$store.getters['user/uId'],
					aId: this.entity.id,
				})
					.then((data) => {
						data = data.data;
						this.entity.likes += data;
						//console.log(data)
					})
					.catch((err) => {
						console.log(err);
					});
			},
			clickoutside() {
				if(this.openComment) {
					this.openComment = false;
					return;
				}
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
		background-color: #faf8f8;
		width: 100%;
		padding: 0 20px;
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
