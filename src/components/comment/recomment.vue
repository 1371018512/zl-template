<template>
	<div>
		<div>
			<div style="font-size: 15px;">
				{{data.user.userName}}
				<img :src="badges[data.user.badgeList[0].type]" />
			</div>
		</div>
		<div>
			{{data.content}}
		</div>
		<div>
			<div>
				发表于{{formatTime(data.date)}}
			</div>
			<div>
				<span>
					<span class="iconfont">&#xe71a;</span>
					赞({{data.likes}})
				</span>
				<span>回复</span>
				<span>举报</span>
			</div>
		</div>
	</div>
</template>

<script>
	import zlProfile from '@/components/Profile/profile2.vue'
	import { formatTime } from '../../utils/index.js'
	import {
		mapGetters
	} from 'vuex'
	
	export default {
		name: 'comment',
		components: {
			zlProfile,
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
		},
		watch: {
		
		},
		props: {
			data: {},
		},
		mounted() {
			console.log(this.data)
		},
		data() {
			return {
				formatTime: formatTime,
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
</style>
