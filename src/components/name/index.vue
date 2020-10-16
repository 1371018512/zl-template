<template>
	<div style="display: inline-block;">
		<el-popover ref="popover" placement="bottom" title="" width="350" trigger="hover" content="">
			<zl-personal-detail
				:data="data"
			/>
		</el-popover>
		<span :style="{ color: level[data.userLevel].color }" v-popover="'popover'">
			{{data.userName}}
			<el-tooltip effect="dark" :content="data.badgeList[0].name" placement="bottom">
				<img :src="badges[data.badgeList[0].type]"/>
			</el-tooltip>
		</span>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { formatTime } from '../../utils/index.js'
	import zlPersonalDetail from '@/components/Popovers/PersonalDetail.vue'
	
	export default {
		components: {
			zlPersonalDetail
		},
		computed: {
		  ...mapGetters([
		    'badges',
			'level'
		  ]),
		},
		props: {
			data: {}
		},
		mounted() {
		},
		data() {
			return {
			};
		},
		methods: {}
	}
</script>

<style scoped>
	img{
	vertical-align: middle;
	}
</style>
