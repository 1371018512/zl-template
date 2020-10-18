<template>
	<div style="position: relative;">
		<img :src="data.profile" :style="hovered?ActiveProfileStyle:ProfileStyle" @mouseover="hovered=true"
		@mouseout="hovered=false"/>
		<span class="iconfont" v-show="hovered" @mouseover="hovered=true">&#xe710;</span>
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
				ActiveProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					filter: 'brightness(70%)',
					transition: 'all 0.3s',
				},
				hovered: false,
			};
		},
		methods: {}
	}
</script>

<style scoped>
	img:first-child:hover {
		filter:brightness(70%);
		transition: all 0.3s;
	}
	.iconfont {
		font-size: 30px;
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		transition: all 0.3s;
	}
</style>
