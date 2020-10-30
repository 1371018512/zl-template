<template>
	<div class="container" v-if="user.nickName">
		<div class="left">
			<el-dialog :visible.sync="DialogVisible" width="600px" top="75px">
				<template v-slot:title>
					<zl-title data="头像修改"></zl-title>
				</template>
				<!-- <zl-art-detail/> -->
				<zl-profile-upload @uploaded="DialogVisible=false"/>
			</el-dialog>
			<zl-profile :data="user" :size="60" @click.native="DialogVisible = true"/>
		</div>
		<div class="mid">
			<div :style="{ color: level[user.userLevel].color, fontSize: '10px' }">
				{{user.nickName}}
				<svg class="icon" aria-hidden="true" v-if="!user.sex" font-size="15px">
					<use xlink:href="#el-icon-zlnv"></use>
				</svg>
				<svg class="icon" aria-hidden="true" v-else font-size="15px">
					<use xlink:href="#el-icon-zlnan"></use>
				</svg>
			</div>
			<div class="base">
				<span>
					<span class="iconfont">&#xe612;</span>
					{{user.school}}
				</span>
				<span>
					<span class="iconfont">&#xe659;</span>
					{{user.graduationYear + '毕业'}}
				</span>
				<span>
					<span class="iconfont">&#xe662;</span>
					{{user.direction}}
				</span>
			</div>
		</div>
		<div class="right">
			<el-button type="success" size="small" v-if="oneself"><span class="iconfont">&#xe815;</span> 打卡</el-button>
			<el-button type="info" size="small" v-show="!oneself && followed" @click="follow"><span class="iconfont">&#xe7b8;</span> 已关注</el-button>
			<el-button type="success" size="small" v-show="!oneself && !followed" @click="follow"><span class="iconfont">&#xe606;</span> 未关注</el-button>
		</div>
	</div>
</template>

<script>
	import zlProfile from '@/components/Profile/photo.vue'
	import zlProfileUpload from './profileUpload.vue'
	import zlTitle from '@/components/common/title.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {
			zlProfile,
			zlProfileUpload,
			zlTitle
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			// 初次计算之前不可避免的会报错
			user() {
				return this.ReactiveUser();
			},
			followed() {
				return this.$store.getters['user/userDetail'].followIds.find((item) => {
					return item == this.user.uId;
				})
			}
		},
		watch: {

		},
		provide() {
			return {};
		},
		inject: ['oneself', 'ReactiveUser'],
		mounted() {
			
		},
		data() {
			return {
				DialogVisible: false,
			};
		},
		methods: {
			follow() {
				this.$store.dispatch('user/follow', {
						uId: this.$store.getters['user/uId'],
						tId: this.user.uId,
					})
					.then((data) => {
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;

		>div {
			min-height: 100%;
		}
	}

	.left {
		flex-basis: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mid {
		padding: 10px 0;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.right {
		line-height: 100%;
		display: flex;
		align-items: center;
	}

	.base>span {
		font-size: 10px;
		line-height: 2.3em;
		display: inline-block;
		padding-right: 5px;
		color: #6d6d6d;
	}
</style>
