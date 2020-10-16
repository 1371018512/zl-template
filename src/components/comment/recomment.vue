<template>
	<div class="container">
		<div style="font-size: 10px;">
			<zl-name :data="data.user"/>
			{{' 回复 '}}
			<zl-name :data="data.target"/>
			:{{data.content}}
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
	import zlName from '@/components/name/index.vue'
	
	export default {
		name: 'comment',
		components: {
			zlProfile,
			zlName,
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
	.container {
		font-size: 10px;
		> :nth-child(2) {
			display: flex;
			justify-content: space-between;
			padding: 10px 0;
			font-size: 10px;
			color: #939393;
			span {
				padding: 0 5px;
				color: #25bb9b;
			}
		}
	}
</style>
