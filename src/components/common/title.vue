<template>
	<div class="contain">
		<div class="point"></div>
		<span :style="spanStyle"><strong>{{data}}</strong></span>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				default: 'title',
				type: String,
			},
			size: {
				default: 20,
			}
		},
		data() {
			return {
				spanStyle: {
					fontSize: this.size + 'px',
					color: '#2c2c2c',
				}
			}
		},
		methods: {}
	}
</script>

<style scoped>
	.point {
		transform: translate(-50%, -50%);
		font-size: 20px;
		display: inline-block;
		width: 5px;
		height: 5px;
		background-color: #ff6547;
		vertical-align: middle;
	}
	.contain {
		display: inline-block;
	}
</style>
