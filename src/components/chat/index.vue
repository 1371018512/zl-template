<template>
	<div :class="left ? 'message_left' : 'message_right'">
		<zl-profile :data="left ? target : $store.getters['user/userDetail']"/>
		<div class="bubble">
			<div :class="left ? 'time' : 'time_right'">{{formatTime(new Date(data.date), '{y}-{m}-{d}')}}</div>
			<div :class="left ? 'triangle_left' : 'triangle_right'"></div>
			<span>{{data.content}}</span>
		</div>
		<el-tooltip class="item" effect="dark" content="对方无法接收你的消息" placement="bottom">
			<svg class="icon warning" aria-hidden="true" v-if="data.refused">
				<use xlink:href="#el-icon-zljinggao"></use>
			</svg>
		</el-tooltip>
		
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
			target: {
			},
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
		display: flex;
		//align-items: flex-start;
		padding: 5px;
		padding-bottom: 25px;
		width: 70%;
		position: relative;
		
		float: right;
		flex-direction: row-reverse;
	}
	.message_left {
		position: relative;
		font-size: 14px;
		display: flex;
		//align-items: flex-start;
		padding: 5px;
		padding-bottom: 25px;
		width: 70%;
	}
	.bubble {
		background-color: #ebf8f5;
		color: #666666;
		margin: 0 20px;
		padding: 12px 15px;
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
		white-space:nowrap;
	}
	
	.time_right {
		color: #8d8d8d;
		position: absolute;
		font-size: 12px;
		bottom: -20px;
		right: 1px;
		white-space:nowrap;
	}
	
	.warning {
		position: relative;
		top: 17px;
	}
</style>
