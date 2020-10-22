<template>
	<div style="display: inline-block;">
		<el-popover v-if="!onlyName" ref="popover" placement="bottom" title="" width="350" trigger="hover" content="">
			<zl-personal-detail
				:data="data"
			/>
		</el-popover>
		<span :style="{ color: level[data.userLevel].color }">
			<span v-popover="'popover'">{{data.nickName}}</span>
			<el-tooltip effect="dark" :content="data.identity.name" placement="bottom" v-if="!onlyName">
				<img :src="badges[data.identity.type]"/>
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
			data: {},
			onlyName: {
				default: false,
			}
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
