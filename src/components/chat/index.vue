<template>
	<div :class="left ? 'message_left' : 'message_right'">
		<zl-profile :data="data.user"/>
		<div class="bubble">
			<div class="time">{{formatTime(data.date)}}</div>
			<div :class="left ? 'triangle_left' : 'triangle_right'"></div>
			<span>{{data.content}}</span>
		</div>
	</div>
</template>

<script>
	import { formatTime } from '../../utils/index.js'
	import zlProfile from '@/components/Profile/profile2.vue'
	
	export default {
		components: {
			zlProfile,
		},
		computed: {
			
		},
		props: {
			data: {},
			left: {},
		},
		watch: {
		},
		provide() {
			return {};
		},
		mounted() {
			
		},
		data() {
			return {
				formatTime: formatTime,
			};
		},
		methods: {}
	}
</script>

<style scoped>
	.message_right {
		font-size: 14px;
		background-color: #67f8b0;
		display: flex;
		align-items: flex-start;
		padding: 5px;
		padding-bottom: 25px;
		width: 70%;
		
		float: right;
		flex-direction: row-reverse;
	}
	.message_left {
		font-size: 14px;
		background-color: #67f8b0;
		display: flex;
		align-items: flex-start;
		padding: 5px;
		padding-bottom: 25px;
		width: 70%;
	}
	.bubble {
		background-color: #ebf8f5;
		color: #666666;
		margin: 0 20px;
		padding: 12px 6px;
		margin-top: 5px;
		border-radius: 6px;
		word-break:break-all;
		word-wrap:break-word;
		position: relative;
	}
	.triangle_left {
		border: 10px solid #000000;
		position: absolute;
		border-color: transparent #ebf8f5 transparent transparent;
		left: -20px;
		top: 5px
	}
	
	.triangle_right {
		border: 10px solid #000000;
		position: absolute;
		border-color: transparent transparent transparent #ebf8f5;
		right: -20px;
		top: 5px
	}
	.time {
		color: #8d8d8d;
		position: absolute;
		font-size: 12px;
		bottom: -20px;
		left: 1px;
	}
</style>
