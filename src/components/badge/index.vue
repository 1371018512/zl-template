<template>
	<div :style="badgeStyle">{{data}}</div>
</template>

<script>
	/* 自己写的标签样式 */
	
	export default {
		computed: {
		},
		props: {
			data: {
				default: '网易',
				type: String,
			},
			color: {
				default: '#a1a1b3',
				type: String,
			}
		},
		data() {
			return {
				badgeStyle: {
					padding: '0px 15px',
					borderRadius: '10px',
					fontSize: '10px',
					lineHeight: '20px',
					border: '1px solid ' + this.color,
					display: 'inline-block',
					color: '#ffffff',
					cursor: 'pointer',
					background: this.color,
				},
			};
		},
		methods: {
		}
	}
</script>

<style scoped>
	.badge {
		padding: 0px 10px;
		border-radius: 10px;
		font-size: 10px;
		line-height: 20px;
		border: 1px solid #cccccc;
		display: inline-block;
		color: #cccccc;
		cursor: pointer;
		transition: all 0.3s;
	}
</style>
