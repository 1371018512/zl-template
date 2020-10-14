<template>
	<div>
		<div class="container">
			<div class="profileContainer">
				<zl-profile :src="news[index].follow.user.profile"/>
			</div>
			<div class="infContainer">
				<div :style="{ color: level[news[index].follow.user.userLevel].color }">
					{{news[index].follow.user.userName}}
				</div>
				<div style="color: #b3b3b3;">
					<span class="infDetail">
						<span>学校</span>
						<span>{{news[index].follow.user.school}}</span>
					</span>|
					<span class="infDetail">
						<span>毕业</span>
						<span>{{news[index].follow.user.graduationYear}}</span>
					</span>|
					<span class="infDetail">
						<span>职业方向</span>
						<span>{{news[index].follow.user.direction}}</span>
					</span>
				</div>
				<div class="follow">
					<el-button type="success" size="mini">关注</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import zlProfile from '../Profile/profile2.vue'
	
	export default {
		
		components: {
			zlProfile,
		},
		inject: ['news'],
		computed: {
			...mapGetters([
				'level'
			]),
		},
		props: {
			index: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
			};
		},
		methods: {}
	}
</script>

<style scoped>
	.container {
		background: #f6f6f6;
		height: 70px;
		border-radius: 5px;
		margin-bottom: 15px;
		position: relative;
	}
	.profileContainer {
		display: inline-block;
		height: 100%;
		padding-left: 10px;
		max-width: 50px;
	}
	.infContainer {
		font-size: 13px;
		display: inline-block;
		padding-left: 15px;
	}
	.infDetail > span:nth-child(1){
		display: inline-block;
		padding-right: 20px;
	}
	.infDetail > span:nth-child(2){
		display: inline-block;
		padding-right: 4px;
		color: #666666;
	}
	.follow {
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		right: 10px;
	}
</style>
