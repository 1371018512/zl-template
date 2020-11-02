<template>
	<el-container class="con">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title || '动态'}}</span>
			</template>
			<zl-art-detail @Refresh="getArts"/>
		</el-dialog>
		<el-container>
			<el-aside width="250px" class="aside">
				<div>
					<zl-title data="消息中心" />
					<el-button type="text" style="float: right;" @click="readAll">全部标记已读</el-button>
				</div>
				<div class="bell" @click.stop="goInfomation">
					<svg class="icon" aria-hidden="true" >
					  <use xlink:href="#el-icon-zlbell"></use>
					</svg>
					系统消息
				</div>
				<zl-search />
				<div class="talks">
					<div class="talk" v-for="(item, i) in leftTalks" @click="goChatRoom(item)">
						<el-badge :value="item.messages.length - item.readto" class="item" :hidden="item.messages.length == item.readto">
							<div>
								<zl-profile :data="item.target"/>
							</div>
						</el-badge>
						<div style="margin-left: 16px;">
							<zl-name :data="item.target" :onlyName="true"/>
							<div>{{leftTalksContent[i]}}</div>
						</div>
						<span class="iconfont close" @click.stop="deleteTalk(item, i)">&#xe7a9;</span>
					</div>
				</div>
			</el-aside>
			<el-main class="main">
				<router-view @goDetail="goDetail" @readed="readed"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import zlTitle from '@/components/common/title.vue'
	import zlSearch from '@/components/Search/search.vue'
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlName from '@/components/name/index.vue'
	import zlArtDetail from '@/views/artDetail/index.vue'

	export default {
		components: {
			zlTitle,
			zlSearch,
			zlProfile,
			zlName,
			zlArtDetail
		},
		computed: {
			leftTalksContent() {
				let arr = [];
				arr = this.leftTalks.map(function(item, i) {
					//console.log(item.talks.slice(-1)[0]);
					let temp = item.lastMessage;
					if(temp && temp.length > 10) {
						temp = temp.slice(0, 7) + ' ...';
					}
					return temp;
				})
				return arr;
			}
		},
		watch: {

		},
		provide() {
			return {};
		},
		async mounted() {
			let talks = [];
			await this.$store.commit('user/oldInfo')
			await this.$store.dispatch('user/oldInfo', {
				uId: this.$store.getters['user/uId'],
			}) 
			await this.$store.dispatch('talk/getTalk', {
				uId: this.$store.getters['user/uId'],
			})
				.then((data) => {
					talks = data.data;
				})
			let userIds = talks.map((item) => {
				return item.tId;
			})
			await this.$store.dispatch('user/getInfos', userIds)
				.then((data) => {
					data = data.data;
					talks = talks.map((item) => {
						item.target = data[item.tId];
						return item;
					})
					this.leftTalks = talks;
				})
		},
		data() {
			return {
				talkIndex: 0,
				DialogVisible: false,
				leftTalks: []
			};
		},
		methods: {
			goDetail() {
				this.DialogVisible = true
				
				if(!this.$store.getters['art/art'].title) {
					return;
				}
				
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
			},
			getArts() {
				
			},
			deleteTalk(item, i) {
				this.$store.dispatch('talk/deleteTalk', {
						uId: this.$store.getters['user/uId'],
						tId: item.tId
					})
				this.leftTalks.splice(i, 1);
			},
			goChatRoom(item) {
				this.$router.push({ path: '/information/talk/' + item.tId })
			},
			goInfomation() {
				this.$router.push({ path: '/information' })
			},
			readed() {
				this.leftTalks.forEach((item, i) => {
					if(item.tId == this.$route.params.t_id) {
						this.leftTalks[i].readto = this.leftTalks[i].messages.length;
					}
				})
			},
			async readAll() {
				await this.$store.dispatch('talk/readAll', {
						uId: this.$store.getters['user/uId'],
					})
				this.leftTalks.forEach((item, i) => {
					this.leftTalks[i].readto = this.leftTalks[i].messages.length;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.con {
		margin-top: 73px;
		flex-basis: 700px;
		max-width: 950px;
	}
	
	.bell {
		display: flex;
		cursor: pointer;
		color: #25bb9b;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
	}
	
	.head,
	.aside,
	.main {
		margin: 10px;
		border-radius: 5px;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
		
	}

	.main {
	}
	
	.talks {
		padding: 5px;
		> div {
			position: relative;
			padding: 5px;
			margin-top: 5px;
			display: flex;
			font-size: 13px;
			line-height: 1.2em;
			color: #949494;
			cursor: pointer;
			&:hover {
				background-color: #dddddd;
				& .close {
					display: block;
				}
			}
			& .close {
				color: red;
				position: absolute;
				right: -20px;
				top: 50%;
				transform: translate(0,-50%);
				font-size: 20px;
				display: none;
			}
		}
		
	}
	
</style>
