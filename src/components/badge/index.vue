<template>
	<div :class="hovered ? 'badge-hovered' : 'badge'" @mouseover="hover" @mouseleave="out">{{data}}</div>
</template>

<script>
	export default {
		computed: {
		},
		props: {
			data: {
				default: '网易',
				type: String,
			},
		},
		data() {
			return {
				hovered: false,
			};
		},
		methods: {
			hover() {
				this.hovered = true;
			},
			out() {
				this.hovered = false;
			}
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
		margin-left: 10px;
		color: #cccccc;
		cursor: pointer;
		transition: all 0.3s;
	}
	
	.badge-hovered {
		padding: 0px 10px;
		border-radius: 10px;
		font-size: 10px;
		line-height: 20px;
		border: 1px solid #25bb9b;
		display: inline-block;
		margin-left: 10px;
		color: #25bb9b;
		cursor: pointer;
		transition: all 0.3s;
	}
</style>
