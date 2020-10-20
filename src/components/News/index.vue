<template>
	<div class="container">
		<el-container>
			<el-aside width="60px" class="profileContainer">
				<zl-profile2 :data="news[index].user" v-popover:popover1 />
				<el-popover ref="popover1" placement="bottom" title="" width="350" trigger="hover" content="">
					<zl-personal-detail
						:index="index"
						:data="news[index].user"
					/>
				</el-popover>
			</el-aside>
			<el-container>
				<el-header class="title" height="35px">
					<zl-title :index="index" />
				</el-header>
				<el-main class="art-body">
					<zl-art v-if="news[index].art" :data="news[index].art"/>
					<zl-follow :index="index" :data="news[index]" v-else-if="news[index].follow" />
					<zl-blink v-else :data="news[index].blink"/>
				</el-main>
			</el-container>
		</el-container>
		<div class="buttons" v-if="!news[index].follow">
			<div>
				<span class="iconfont">&#xe71a;</span> {{this.entity.likes}}
				<span>|</span>
			</div>
			<div>
				<span class="iconfont">&#xe683;</span> {{this.entity.comments.length}}
				<span>|</span>
			</div>
			<div>
				<span class="iconfont">&#xe600;</span> {{this.entity.forwards}}
				<span>|</span>
			</div>
			<div>
				<span class="iconfont">&#xe7df;</span>
			</div>
		</div>
		<div class="comments" v-if="news[index].blink">
			<!-- <div class="art-footer-header">
				<div>
					<zl-title :data="$store.getters['artDetail/art'].comments.length + '条回帖'"/>
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
				<el-button type="success"><span class="iconfont" style="color: white;font-size: 0.7em;">&#xf06c;</span> 回帖</el-button>
			</div>
			<div class="comment">
				<zl-comment v-for="(item, i) in $store.getters['artDetail/art'].comments.data" :data="item" :index="i" :key="i"/>
			</div> -->
		</div>
	</div>
</template>

<script>
	import zlProfile2 from '../Profile/profile2.vue'
	import zlTitle from './title.vue'
	import zlArt from './art.vue'
	import zlFollow from './follow.vue'
	import zlPersonalDetail from '../Popovers/PersonalDetail.vue'
	import zlBlink from './blink.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {
			zlProfile2,
			zlTitle,
			zlArt,
			zlFollow,
			zlPersonalDetail,
			zlBlink,
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			entity() {
				if(this.news[this.index].art) {
					return this.news[this.index].art;
				}else {
					return this.news[this.index].blink;
				}
			}
		},
		mounted() {
			
		},
		inject: ['news'],
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

<style scoped lang="scss">
	.comments {
		width: 100%;
		height: 100px;
		background-color: #f6f6f6;
	}
	
	.container {
		width: 100%;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
		margin-top: 13px;
		box-shadow: 0 0 5px #eeeeee;
	}

	.profileContainer {
		padding: 5px;
		display: flex;
		background-color: transparent;
		justify-content: center;
		height: 50px;
	}

	.title {
		height: 35px;
		padding-left: 5px;
	}

	.art-body {
		padding: 0 20px 0 5px;
	}
	
	.buttons {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #dfdfdf;
		> div {
			color: #b0b0b0;
			flex: 1;
			cursor: pointer;
			position: relative;
			text-align: center;
			> span:nth-child(2) {
				right: 0;
				position: absolute;
				color: #dfdfdf;
			}
			&:hover {
				color: #25bb9b;
			}
		}
	}
</style>
