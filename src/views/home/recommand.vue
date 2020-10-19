<template>
	<div class="container">
		<zl-title data="推荐关注"/>
		<div v-for="(item, i) in data" :key="i" class="user">
			<el-popover :ref="'popover' + i" placement="bottom" title="" width="350" trigger="hover" content="">
				<zl-personal-detail
					:data="item"
				/>
			</el-popover>
			<zl-profile :data="item" v-popover="'popover' + i"/>
			<div class="text">
				<zl-name :data="item" class="name"/>
				<div>{{item.introduction}}</div>
			</div>
			<div style="display: flex;align-items: center;">
				<el-button type="success" size="mini">关注</el-button>
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
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	.user {
		display: flex;
		justify-content: space-around;
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
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 180px;
	}
</style>
