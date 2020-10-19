<template>
	<div>
		<p class="content">
			{{data.content}}
		</p>
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
	.content {
		line-height: 1.5em !important;
		font-size: 13px;
		margin: 5px 0;
	}
</style>
