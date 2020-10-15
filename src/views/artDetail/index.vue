<template>
	<div class="art-container">
		<div class="art-header">
			<!-- <div class="art-header-left">
				<zl-profile :src="$store.getters['artDetail/user'].profile"/>
			</div> -->
			<div class="art-header-left">
				<el-container>
					<el-aside width="80px" class="art-header-left-aside">
						<zl-profile :src="$store.getters['artDetail/user'].profile" :size="50" />
					</el-aside>
					<el-main class="art-header-left-main">
						<div>
							{{$store.getters['artDetail/user'].userName}}
							<el-tooltip effect="dark" :content="$store.getters['artDetail/user'].badgeList[0].name" placement="bottom">
								<img :src="badges[$store.getters['artDetail/user'].badgeList[0].type]" />
							</el-tooltip>
						</div>
						<div>
							{{ $store.getters['artDetail/art'].lastModify == $store.getters['artDetail/art'].date ? '发布于' : '编辑于'}}
							<span style="margin-left: 20px;">{{formatTime($store.getters['artDetail/art'].lastModify)}}</span>
						</div>
					</el-main>
				</el-container>
			</div>
			<div class="art-header-right">
				<div>
					<span v-for="(item, index) in $store.getters['artDetail/art'].tag" class="green" :key="item">
						#{{item}}#
					</span>
				</div>
				<div>
					<span>赞 {{$store.getters['artDetail/art'].likes}}</span>
					<span>收藏 {{$store.getters['artDetail/art'].collects}}</span>
					<span>回复 {{$store.getters['artDetail/art'].comments.length}}</span>
					<span>浏览 {{$store.getters['artDetail/art'].views}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import zlProfile from '@/components/Profile/profile2.vue'
	import {
		mapGetters
	} from 'vuex'
	import { formatTime } from '../../utils/index.js'
	
	export default {
		name: 'artDetail',
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
		provide() {},
		mounted() {},
		data() {
			return {
				formatTime: formatTime,
			}
		},
		methods: {}
	}
</script>

<style scoped>
	.art-header {
		display: flex;
		justify-content: space-between;
	}
	
	.art-header-left, .art-header-right{
		background-color: #0000FF;
		padding: 0px;
	}
	
	.art-header-right > div{
		text-align: right;
	}
	
	.art-header-right > div > span {
		padding-right: 12px;
	}
	
	.art-header-left-aside {
		background-color: transparent;
	}
	
	.art-header-left-main, .art-header-right {
		background-color: #55ff93;
		padding: 10px;
		font-size: 10px;
		line-height: 20px;
	}
	
	.green {
		color: #25bb9b;
		cursor: pointer;
	}
</style>
