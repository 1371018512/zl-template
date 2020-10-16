<template>
	<div class="container">
		<el-container>
			<el-aside width="50px" class="header-aside">
				<zl-profile :src="data.user.profile"/>
			</el-aside>
			<el-main class="header-main">
				<div>
					<div style="font-size: 15px;">
						{{data.user.userName}}
						<img :src="badges[data.user.badgeList[0].type]" />
					</div>
					<div>
						<el-tag type="info">#{{index + 1}}</el-tag>
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
				<div class="recomments">
					<zl-recomment :data="item" v-for="(item, i) in data.recomments.data" :key="i"/>
				</div>
			</el-main>
		</el-container>
		
	</div>
</template>

<script>
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlRecomment from './recomment.vue'
	import { formatTime } from '../../utils/index.js'
	import {
		mapGetters
	} from 'vuex'
	
	export default {
		name: 'comment',
		components: {
			zlProfile,
			zlRecomment
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
			index: {},
		},
		provide() {},
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
		margin-top: 20px;
	}
	
	.header-aside {
		background: transparent;
		padding: 10px;
	}
	
	.header-main{
		background: transparent;
		padding: 10px;
		> :first-child {
			display: flex;
			justify-content: space-between;
		}
		> :nth-child(3) {
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
	
	.recomments {
		background-color: orange;
	}
</style>
