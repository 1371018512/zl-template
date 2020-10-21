<template>
	<div class="container2">
		<el-container>
			<el-aside width="50px" class="header-aside">
				<zl-profile :data="data.user" v-popover:popover1/>
				<el-popover ref="popover1" placement="bottom" title="" width="350" trigger="hover" content="">
					<zl-personal-detail
						:data="data.user"
					/>
				</el-popover>
			</el-aside>
			<el-main class="header-main">
				<div>
					<div style="font-size: 10px;">
						<zl-name :data="data.user"/>
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
						<span @click="openInput = !openInput">回复</span>
						<span>举报</span>
					</div>
				</div>
				<div class="recomments">
					<template v-for="(item, i) in data.recomments.data">
						<zl-recomment :data="item" @openInput="openInput = !openInput"/>
						<hr v-if="i < data.recomments.data.length - 1"/>
					</template>
					<!-- todo 这里默认不显示 -->
					<div class="inputContainer" v-show="openInput">
						<el-input
						  placeholder="请输入你的观点"
						  v-model="textarea"
						  size="small"
						  clearable>
						</el-input>
						<div style="display: flex;flex-direction: row-reverse;padding-top: 10px;">
							<el-button type="success" size="mini">回复</el-button>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
		
	</div>
</template>

<script>
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlRecomment from './recomment.vue'
	import { formatTime } from '../../utils/index.js'
	import zlName from '@/components/name/index.vue'
	import {
		mapGetters
	} from 'vuex'
	import zlPersonalDetail from '../Popovers/PersonalDetail.vue'
	
	export default {
		name: 'comment',
		components: {
			zlProfile,
			zlRecomment,
			zlName,
			zlPersonalDetail
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
				textarea: '',
				openInput: false,
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.container2 {
		//background-color: yellow;
		//margin-top: 20px;
		line-height: 1em;
	}
	
	.header-aside {
		background: transparent;
		padding: 10px;
	}
	
	.header-main{
		background: transparent;
		font-size: 10px;
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
				cursor: pointer;
			}
		}
	}
	
	.recomments {
		border-radius: 5px;
		background-color: #eff0f2;
		padding: 10px;
	}
	
	.inputContainer {
		padding: 5px 10px;
	}
	
	hr {
		transform: scale(1.03);
		border: none;
		border-top: 1px dashed #cfcfcf;
	}
</style>
