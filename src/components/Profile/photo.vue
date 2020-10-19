<template>
	<div class="container">
		<img :src="data.profile" :style="ProfileStyle"/>
		<span class="iconfont">&#xe710;</span>
	</div>
</template>

<script>
	export default {
		components: {
		},
		props: {
			size: {
				type: Number,
				default: 40,
			},
			data: {
			},
		},
		created() {},
		mounted() {
		},
		data() {
			return {
				ProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					//filter: 'brightness(70%)',
					transition: 'all 0.3s',
				},
			};
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.iconfont {
		font-size: 30px;
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		opacity: 0;
		transition: all 0.3s;
	}
	.container {
		position: relative;
		&:hover {
			> img {
				filter:brightness(70%);
				transition: all 0.3s;
			}
			> .iconfont {
				opacity:1;
			}
		}
	}
</style>
