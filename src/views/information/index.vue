<template>
	<el-container class="con">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail @Refresh="getArts"/>
		</el-dialog>
		<el-container>
			<el-aside width="250px" class="aside">
				<div>
					<zl-title data="消息中心" />
					<el-button type="text" style="float: right;">全部标记已读</el-button>
				</div>
				<div class="bell">
					<svg class="icon" aria-hidden="true" >
					  <use xlink:href="#el-icon-zlbell"></use>
					</svg>
					系统消息
				</div>
				<zl-search />
				<div class="talks">
					<div class="talk" v-for="(item, i) in leftTalks">
						<div>
							<zl-profile :data="item.target"/>
						</div>
						<div style="margin-left: 10px;">
							<zl-name :data="item.target" :onlyName="true"/>
							<div>{{leftTalksContent[i]}}</div>
						</div>
					</div>
				</div>
			</el-aside>
			<el-main class="main">
				<router-view @goDetail="goDetail"></router-view>
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
					let temp = item.talks.slice(-1)[0].content;
					if(temp.length > 11) {
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
		mounted() {
			this.$store.commit('user/oldInfo')
			this.$store.dispatch('user/oldInfo', {
				uId: this.$store.getters['user/uId'],
			}) 
		},
		data() {
			return {
				talkIndex: 0,
				DialogVisible: false,
				leftTalks: [{
					target: {
						uId: 992973332,
						introduction: '我是一个保安，爱吃小熊饼干',
						education: '本科',
						base: '杭州',
						sex: 1,
						belikes: 1100,
						becollects: 1001,
						codePass: 30,
						problemPass: 37,
						highquiltyOutput: 100,
						identity: {
							name: '字节跳动_Data_后端开发工程师',
							type: 'trainee',
						},
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						nickName: 'shining4code',
						school: '浙江大学',
						graduationYear: 2021,
						direction: '产品',
					},
					talks: [{
						date: new Date(),
						content: '你好啊!!!!!!!!!!!!!',
						user: {
							// ...
							nickName: 'shining4code',
							profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						}
					},{
						date: new Date(),
						content: '你也好!!!!!!!!!!!!!',
						user: {
							// ...
							nickName: '今天也是没有收到offer的一天',
							profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
						}
					}]
				}]
			};
		},
		methods: {
			goDetail() {
				this.DialogVisible = true
			},
			getArts() {
				
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
			padding: 5px;
			margin-top: 5px;
			display: flex;
			font-size: 13px;
			line-height: 1.2em;
			color: #949494;
			cursor: pointer;
			&:hover {
				background-color: #dddddd;
			}
		}
	}
	
</style>
