<template>
	<div class="container">
		<zl-title data="推荐关注"/>
		<div v-for="(item, i) in data" :key="i" class="user">
			<el-popover :ref="'popover' + i" placement="bottom" title="" width="350" trigger="hover" content="">
				<zl-personal-detail
					:data="item"
				/>
			</el-popover>
			<div style="display: flex;width: 100%;">
				<zl-profile :data="item" v-popover="'popover' + i"/>
				<div class="text">
					<zl-name :data="item" class="name"/>
					<div>{{item.introduction}}</div>
				</div>
			</div>
			<div style="display: flex;align-items: center;">
				<el-button v-show="item.uId != $store.getters['user/uId'] && !followed[i]"
				type="success" size="mini" @click="follow(item)">关注</el-button>
				<el-button v-show="item.uId != $store.getters['user/uId'] && followed[i]"
				type="info" size="mini" @click="follow(item)">取关</el-button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue';
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlName from '@/components/name/index.vue'
	import zlPersonalDetail from '@/components/Popovers/PersonalDetail.vue'
	
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
			followed() {
				return this.data.map((item) => {
					return this.$store.getters['user/userDetail'].followIds.find((ite) => {
						return ite == item.uId;
					})
				})
			}
		},
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
			follow(item) {
				this.$store.dispatch('user/follow', {
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

<style scoped>
	.user {
		display: flex;
		justify-content: space-between;
		padding: 5px 0;
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
	
	.text {
		margin-left: 10px;
	}
</style>
