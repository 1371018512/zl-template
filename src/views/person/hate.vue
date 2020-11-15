<template>
	<div class="container">
		<div class="header">
			<zl-title data="我的黑名单" />
		</div>
		<hr>
		<div class="body">
			<div v-for="(item, i) in data" :key="item.uId" class="user">
				<el-popover :ref="'popover' + i" placement="bottom" title="" width="350" trigger="hover" content="">
					<zl-personal-detail
						:data="item"
					/>
				</el-popover>
				<div class="info">
					<zl-profile style="" :data="item" v-popover="'popover' + i"/>
					<div class="text">
						<zl-name :data="item" class="name"/>
						<div>{{item.introduction}}</div>
					</div>
				</div>
				
				<div style="display: flex;align-items: center;">
					<el-button v-show="item.uId != $store.getters['user/uId'] && !hated[i]"
					type="success" size="mini" @click="hate(item)">拉黑</el-button>
					<el-button v-show="item.uId != $store.getters['user/uId'] && hated[i]"
					type="info" size="mini" @click="hate(item)">取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue'
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlName from '@/components/name/index.vue'
	import zlPersonalDetail from '@/components/Popovers/PersonalDetail.vue'
	import {
		mapGetters
	} from 'vuex'
	
	export default {
		components: {
			zlTitle,
			zlProfile,
			zlName,
			zlPersonalDetail
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			hated() {
				return this.data.map((item) => {
					return this.$store.getters['user/userDetail'].hateIds.find((ite) => {
						return ite == item.uId;
					})
				})
			}
		},
		watch: {
		},
		props: {
		},
		provide() {},
		activated: function() {
			this.data = [];
			this.$store.dispatch('user/getInfos', this.$store.getters['user/userDetail'].hateIds)
				.then((data) => {
					for(let item in data.data) {
						this.data.push(data.data[item]);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async mounted() {
			
		},
		data() {
			return {
				data: [],
			}
		},
		methods: {
			hate(item) {
				this.$store.dispatch('user/hate', {
						uId: this.$store.getters['user/uId'],
						tId: item.uId,
					})
					.then((data) => {
					})
					.catch((err) => {
						console.log(err);
					});
			},
		}
	}
</script>

<style scoped lang="scss">
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
		transform: scale(1.06);
		border-top: 1px dashed #cfcfcf;
	}
	
	.user {
		display: flex;
		justify-content: space-between;
		padding: 5px 0;
	}
	.info {
		display: flex;
		width: 100%;
	}
	.text {
		margin-left: 20px;
		> div:nth-child(2) {
			font-size: 13px;
		}
	}
</style>
