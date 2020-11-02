<template>
	<div class="container">
		<div>
			<zl-title data="分享与求助"/>
			<zl-search style="margin: 0 10px;"/>
			<el-button type="success" size="mini" style="float: right; margin-top: 3px;" @click="goHome">
				<span class="iconfont">&#xf06c;</span> 我要发布
			</el-button>
		</div>
		<div class="topic">
			<div @click="topicIndex = i" v-for="(item, i) in topics" :key="item.label" :class="{ 'topicActive': i == topicIndex }">
				{{item.label}}
			</div>
		</div>
		<div class="sortBy">
			<span v-for="(item, i) in sortBy" :key="item.label">
				<span :class="{ 'sortActive': i == sortIndex }" @click="sortIndex = i">{{item.label}}</span>
				<span v-if="i != sortBy.length - 1"> | </span>
			</span>
		</div>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue';
	import zlSearch from '../../components/Search/search.vue'
	
	export default {
		components: {
			zlTitle,
			zlSearch,
		},
		computed: {
		},
		watch: {
			topicIndex(value) {
			    this.$emit('filterCondition',{
					topic: this.topics[this.topicIndex].value,
					sort: this.sortBy[this.sortIndex].value,
				})
			},
			sortIndex(value) {
			    this.$emit('filterCondition',{
					topic: this.topics[this.topicIndex].value,
					sort: this.sortBy[this.sortIndex].value,
				})
			}
		},
		mounted() {},
		data() {
			return {
				topicIndex: 0,
				sortIndex: 0,
				topics: [{
					label: '全部',
					value: '',
				}, {
					label: '站内公告',
					value: 'announcement',
				}, {
					label: '笔经面经',
					value: 'guide',
				}, {
					label: '我要提问',
					value: 'question',
				}, {
					label: '技术交流',
					value: 'technology',
				}, {
					label: '招聘信息',
					value: 'recruit',
				}, {
					label: '猿生活',
					value: 'life',
				}, ],
				sortBy: [{
					// 综合时间和活跃度
					label: '默认',
					value: '',
				}, {
					label: '最新回复',
					value: 'comment',
				}, {
					label: '最新发布',
					value: 'publish',
				}]
			};
		},
		methods: {
			goHome() {
				this.$router.push({ path: '/'})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		font-size: 10px;
		width: 100%;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
		box-shadow: 0 0 5px #eeeeee;
		padding: 10px 20px 10px 10px;
		margin-top: 13px;
	}
	.topic {
		background-color: #f5f5f5;
		padding: 5px 10px;
		margin: 10px 0;
		> div {
			line-height: 1.9em;
			display: inline-block;
			font-size: 14px;
			margin-top: 5px;
			margin-right: 15px;
			padding: 0 7px;
			cursor: pointer;
			transition: 0.5s all;
		}
	}
	.topicActive {
		background-color: #25bb9b;
		color: white;
		border-radius: 2px;
		box-shadow: 1px 1px 1px #cacaca;
	}
	.sortBy {
		font-size: 14px;
		color: #8a8a8a;
		padding: 3px 5px;
		> span {
			> span:first-child {
				margin: 0 5px;
				display: inline-block;
				cursor: pointer;
			}
		}
	}
	.sortActive {		color: #25bb9b;	}
</style>
