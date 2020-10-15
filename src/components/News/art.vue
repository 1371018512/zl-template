<template>
	<div>
		<span class="title"><strong>{{news[index].art.title}}</strong></span>
		<p class="content">
			<span v-for="(item, index) in news[index].art.tag" class="green" :key="item">
				#{{item}}#
			</span>
			{{content}}
			<span v-if="more" class="green">...查看更多</span>
		</p>
		<div class="badgeContainer">
			<el-tag v-for="(item, index) in news[index].art.topic" size="mini" :key="item">
				{{item}}
			</el-tag>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		formatTime
	} from '../../utils/index.js'

	export default {
		components: {
		},
		inject: ['news'],
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			content() {
				if (this.news[this.index].art.content.length < 100) {
					return this.news[this.index].art.content;
				} else {
					this.more = true;
					return this.news[this.index].art.content.slice(0, 100);
				}
			},
		},
		props: {
			index: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				more: false,
			};
		},
		methods: {}
	}
</script>

<style scoped>
	.title {
		font-size: 1.2em;
		display: block;
	}

	.content {
		line-height: 1.5em !important;
		font-size: 13px;
		margin: 5px 0;
	}

	.green {
		color: #25bb9b;
		cursor: pointer;
	}

	.badgeContainer {
		padding: 10px 0;
	}
	
	.badgeContainer > *{
		margin-right: 10px;
	}
</style>
