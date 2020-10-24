<template>
	<div class="art-container" ref="container">
		<div class="art-header">
			<div class="art-header-left">
				<el-container>
					<el-aside width="80px" class="art-header-left-aside">
						<zl-profile :data="$store.getters['art/user']" :size="50" v-popover:popover1/>
						<el-popover ref="popover1" placement="bottom" title="" width="350" trigger="hover" content="">
							<zl-personal-detail
								:data="$store.getters['art/user']"
							/>
						</el-popover>
					</el-aside>
					<el-main class="art-header-left-main">
						<div>
							<zl-name :data="$store.getters['art/user']"/>
						</div>
						<div>
							{{ $store.getters['art/art'].lastModify == $store.getters['art/art'].date ? '发布于' : '编辑于'}}
							<span style="margin-left: 20px;">{{formatTime($store.getters['art/art'].lastModify)}}</span>
						</div>
					</el-main>
				</el-container>
			</div>
			<div class="art-header-right">
				<div>
					<span v-for="(item, index) in $store.getters['art/art'].tag" class="green" :key="item">
						#{{item}}#
					</span>
				</div>
				<div>
					<span>赞 {{$store.getters['art/art'].likes}}</span>
					<span>收藏 {{$store.getters['art/art'].collects}}</span>
					<span>回复 {{$store.getters['art/art'].comments.length}}</span>
					<span>浏览 {{$store.getters['art/art'].views}}</span>
				</div>
			</div>
		</div>
		<hr/>
		<div class="art-body">
			<pre>{{$store.getters['art/art'].content}}</pre>
			<div class="art-body-bottom">
				<span>
					<span class="iconfont">&#xe66d;</span>
					收藏({{$store.getters['art/art'].collects}})
				</span>
				<span>
					<span class="iconfont">&#xe600;</span>
					分享
				</span>
				<span>
					<span class="iconfont">&#xe71a;</span>
					赞({{$store.getters['art/art'].collects}})
				</span>
				<span>回帖</span>
				<span>举报</span>
			</div>
		</div>
		<hr/>
		<div class="art-footer">
			<div class="art-footer-header">
				<div>
					<zl-title :data="$store.getters['art/art'].comments.length + '条回帖'"/>
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
				<el-button type="success" @click.native="scrollToEnd"><span class="iconfont" style="color: white;font-size: 0.7em;">&#xf06c;</span> 回帖</el-button>
			</div>
			<div class="comment">
				<zl-comment v-for="(item, i) in $store.getters['art/art'].comments" :data="item" :index="i" :key="i"/>
			</div>
		</div>
		<hr/>
		<el-input type="textarea" v-model="commentContent" placeholder="请在这里添加你的回帖吧"></el-input>
		<div class="buttons">
			<el-button type="primary" size="small">发布</el-button>
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
	import zlName from '@/components/name/index.vue'
	import zlPersonalDetail from '@/components/Popovers/PersonalDetail.vue'
	import zlTitle from '@/components/common/title.vue'
	import { scrollTo } from '../../utils/scroll-to.js'
	
	export default {
		components: {
			zlProfile,
			zlComment,
			zlName,
			zlPersonalDetail,
			zlTitle,
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
		mounted() {
		},
		data() {
			return {
				formatTime: formatTime,
				collectFlag: false,
				commentContent: '',
			}
		},
		methods: {
			scrollToEnd() {
				scrollTo(9999, 3000, () => {}, this.$refs.container.parentElement.parentElement.parentElement)
				//window.scrollTo(0,this.top)
				console.log(this.$refs.container.parentElement.parentElement.parentElement);
				/* this.$nextTick(() => {
					this.$refs.container.parentElement.parentElement.parentElement.scrollTop = 1000;
				}) */
			}
		}
	}
</script>

<style scoped lang="scss">
	.buttons {
		margin-top: 10px;
		float: right;
	}
	
	.art-header {
		display: flex;
		justify-content: space-between;
	}
	
	.art-header-left, .art-header-right{
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
		margin-bottom: 20px;
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
	
	.art-container {
		padding-bottom: 20px;
	}
</style>
