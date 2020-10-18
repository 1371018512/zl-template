<template>
	<div>
		<span class="title"><strong>{{data.title}}</strong></span>
		<p class="content">
			<template v-if="!replaceContent">
				<span v-for="(item, index) in data.tag" class="green" :key="item">
					#{{item}}#
				</span>
				{{content}}
				<span v-if="more" class="green">...查看更多</span>
			</template>
			<template v-else>
				{{replaceContent}}
			</template>
		</p>
		<div class="badgeContainer" v-if="needTags">
			<el-tag v-for="(item, index) in data.topic" size="mini" :key="item">
				{{item}}
			</el-tag>
		</div>
		<div v-if="needDate" class="artFooter">
			发表于 {{formatTime(data.date)}}
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
		//inject: ['news'],
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
			content() {
				if (this.data.content.length < 100) {
					return this.data.content;
				} else {
					this.more = true;
					return this.data.content.slice(0, 100);
				}
			},
		},
		mounted() {
		},
		props: {
			index: {
				type: Number,
				default: 0,
			},
			data: {
				
			},
			needTags: {
				default: true,
			},
			needDate: {
				default: false,
			},
			replaceContent: {
			}
		},
		data() {
			return {
				more: false,
				formatTime: formatTime,
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
	
	.artFooter {
		font-size: 13px;
		color: #888888;
		text-align: right;
	}
</style>
