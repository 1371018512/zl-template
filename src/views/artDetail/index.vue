<template>
	<div class="art-container">
		<div class="art-header">
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
		<hr/>
		<div class="art-body">
			<pre>{{$store.getters['artDetail/art'].content}}</pre>
			<div class="art-body-bottom">
				<span>
					<span class="iconfont">&#xe66d;</span>
					收藏({{$store.getters['artDetail/art'].collects}})
				</span>
				<span>
					<span class="iconfont">&#xe600;</span>
					分享
				</span>
				<span>
					<span class="iconfont">&#xe71a;</span>
					赞({{$store.getters['artDetail/art'].collects}})
				</span>
				<span>回帖</span>
				<span>举报</span>
			</div>
		</div>
		<hr/>
		<div class="art-footer">
			<div class="art-footer-header">
				<div>
					<span class="iconfont">&#xe6de;</span><span>{{$store.getters['artDetail/art'].comments.length + '条回帖'}}</span>
				</div>
				<el-dropdown>
				  <span class="el-dropdown-link">
				    排序方式<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item><span class="iconfont">&#xe659;</span>较近在前</el-dropdown-item>
				    <el-dropdown-item><span class="iconfont">&#xe71a;</span>较赞在前</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				<el-button type="success">回帖</el-button>
			</div>
			<div class="comment">
				<zl-comment v-for="(item, i) in $store.getters['artDetail/art'].comments.data" :data="item" :index="i" :key="i"/>
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
	import zlComment from '@/components/comment/index.vue'
	
	export default {
		name: 'artDetail',
		components: {
			zlProfile,
			zlComment
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
				collectFlag: false,
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.art-header {
		display: flex;
		justify-content: space-between;
	}
	
	.art-header-left, .art-header-right{
		background-color: #0000FF;
	}
	
	.art-header-right > div{
		text-align: right;
		> span {
			padding-right: 12px;
		}
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
	
	.art-body {
		padding: 0px 10px;
		background-color: #00FF00;
	}
	
	hr {
		transform: scale(1.05);
		border: none;
		border-top: 1px dashed #cfcfcf;
	}
	
	.art-body-bottom {
		text-align: right;
		margin-top: 20px;
		> * {
			padding: 0 5px;
		}
	}
	
	.art-footer-header {
		position: relative;
		:first-child {
			span {
				font-size: 20px;
				color: #4a4a4a;
			}
		}
		> * {
			display: inline-block;
			margin-left: 15px;
		}
		:nth-child(3) {
			position: absolute;
			right: 0;
		}
	}
	
	.comment {
		background-color: yellow;
	}
</style>
