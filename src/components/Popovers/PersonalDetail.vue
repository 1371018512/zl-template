<template>
	<div>
		<img :src="background" class="image" />
		<div class="base">
			<span>
				<span class="iconfont">&#xe612;</span>
				{{data.school}}
			</span>
			<span>
				<span class="iconfont">&#xe659;</span>
				{{data.graduationYear + '毕业'}}
			</span>
			<span>
				<span class="iconfont">&#xe662;</span>
				{{data.direction}}
			</span>
		</div>
		<hr />
		<div class="detail">
			<zl-badge :data="level[data.userLevel].name + ' LV.' + data.userLevel" :color="level[data.userLevel].color" />
			<div class="details">
				<span>
					<el-tooltip content="获赞与收藏" placement="top" :open-delay="300">
						<span class="iconfont">&#xe86c;</span>
					</el-tooltip>
					{{likesAndcollects}}
				</span>
				<span>
					<el-tooltip content="通过代码" placement="top" :open-delay="300">
						<span class="iconfont">&#xe668;</span>
					</el-tooltip>
					{{shortInt(data.codePass)}}
				</span>
				<span>
					<el-tooltip content="题目正确" placement="top" :open-delay="300">
						<span class="iconfont">&#xe6f2;</span>
					</el-tooltip>
					{{shortInt(data.problemPass)}}
				</span>
				<span>
					<el-tooltip content="产出优质内容" placement="top" :open-delay="300">
						<span class="iconfont">&#xe672;</span>
					</el-tooltip>
					{{shortInt(data.highquiltyOutput)}}
				</span>
			</div>
		</div>
		<div class="buttons">
			<el-button size="small" v-show="data.uId != $store.getters['user/uId'] && followed" @click="follow">
				<span class="iconfont">&#xe7b8; </span>已关注
			</el-button>
			<el-button size="small" v-show="data.uId != $store.getters['user/uId'] && !followed" @click="follow">
				<span class="iconfont">&#xe606; </span>未关注
			</el-button>
			<el-button size="small" v-if="data.uId != $store.getters['user/uId']" @click="talkwith"><span class="iconfont">&#xe683;
				</span>私信</el-button>
			<el-button size="small"><span class="iconfont">&#xe715; </span>个人主页</el-button>
			<span class="iconfont" v-popover:popover1 v-if="data.uId != $store.getters['user/uId']" style="display: inline-block;margin: 0 10px;">
				&#xe847;
			</span>
			<el-popover ref="popover1" :open-delay="600" placement="bottom" title="" width="0" trigger="hover" content="">
				<div class="more" @click="black(true)" v-show="!hated">拉黑</div>
				<div class="more" @click="black(false)" v-show="hated">取消拉黑</div>
				<div class="more">举报</div>
			</el-popover>
		</div>
		<div class="header">
			<el-container>
				<el-aside width="70px" class="header-aside">
					<zl-profile2 :data="data" :size="50" />
				</el-aside>
				<el-main class="header-main">
					<div style="font-size: 15px;">
						{{data.nickName}}
						<svg class="icon" aria-hidden="true" v-if="!data.sex" font-size="15px">
							<use xlink:href="#el-icon-zlnv"></use>
						</svg>
						<svg class="icon" aria-hidden="true" v-else font-size="15px">
							<use xlink:href="#el-icon-zlnan"></use>
						</svg>
					</div>
					<div v-if="data.identity.name">
						<img :src="badges[data.identity.type]" style="vertical-align: middle;" />
						<span>{{data.identity.name}}</span>
					</div>
				</el-main>
			</el-container>
		</div>
	</div>
</template>

<script>
	import zlBadge from '../badge/index.vue'
	import zlProfile2 from '../Profile/profile2.vue'
	import {
		mapGetters
	} from 'vuex'
	import {
		shortInt
	} from '@/utils/index.js'

	export default {
		components: {
			zlBadge,
			zlProfile2
		},
		mounted() {},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			likesAndcollects() {
				return shortInt(this.data.belikes + this.data.becollects);
			},
			followed() {
				if(this.$store.getters['user/userDetail'].followIds)
					return this.$store.getters['user/userDetail'].followIds.find((item) => {
						return item == this.data.uId;
					})
			},
			hated() {
				if(this.$store.getters['user/userDetail'].hateIds)
				return this.$store.getters['user/userDetail'].hateIds.find((item) => {
					return item == this.data.uId;
				})
			}
		},
		//inject: ['news'],
		props: {
			data: {},
		},
		data() {
			return {
				background: require('../../assets/background.jpg'),
				shortInt: shortInt,
			};

		},
		methods: {
			follow() {
				this.$store.dispatch('user/follow', {
						uId: this.$store.getters['user/uId'],
						tId: this.data.uId,
					})
					.then((data) => {})
					.catch((err) => {
						console.log(err);
					});
			},
			talkwith() {
				this.$router.push({
					path: '/information/talk/' + this.data.uId
				})
			},
			black(flag) {
				if(flag)
					this.$confirm('此操作将拉黑该用户，你将无法收到该用户的私信，请问是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$store.dispatch('user/hate', {
							uId: this.$store.getters['user/uId'],
							tId: this.data.uId,
						})
						this.$message({
							type: 'success',
							message: '拉黑成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消拉黑'
						});
					});
				else
					this.$confirm('将用户从你的黑名单移除?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$store.dispatch('user/hate', {
							uId: this.$store.getters['user/uId'],
							tId: this.data.uId,
						})
						this.$message({
							type: 'success',
							message: '移除成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消移除'
						});
					});
			}
		}
	}
</script>

<style scoped>
	.image {
		width: 100%;
		transform: scale(1.075);
		display: block;
		position: relative;
		top: -8px;
		border-radius: 3px 3px 0 0;
		opacity: 0.89;
	}

	.base>span,
	.details>span {
		font-size: 10px;
		line-height: 2.3em;
		display: inline-block;
		padding-right: 5px;
		color: #6d6d6d;
	}

	hr {
		transform: scale(1.075);
		border: none;
		border-top: 1px dashed #cfcfcf;
	}

	.detail {
		display: flex;
		justify-content: space-between;
	}

	.buttons {
		margin-top: 10px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.more {
		font-size: 10px;
		width: 100%;
		text-align: center;
		cursor: pointer;
	}

	.more:hover {
		color: #409eff;
	}

	.header {
		position: absolute;
		top: 20px;
	}

	.header-aside {
		background: transparent;
		padding: 0;
	}

	.header-main {
		padding: 5px;
		color: white;
		font-size: 11px;
	}

	.header-main>* {
		margin-bottom: 5px;
	}
</style>
