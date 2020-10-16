<template>
	<div>
		<img :src="data.profile" :style="hovered?ActiveProfileStyle:ProfileStyle" @mouseover="hovered=true"
		 @mouseout="hovered=false"/>
	</div>
</template>

<script>
	export default {
		components: {
		},
		inject: ['news'],
		props: {
			size: {
				type: Number,
				default: 40,
			},
			data: {
			},
		},
		created() {},
		mounted() {},
		data() {
			return {
				ProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					border: '2px solid #e7e7e7',
				},
				ActiveProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					border: '2px solid rgba(230, 230, 230, 0.5)',
					//boxShadow: '0 0 5px rgba(170, 170, 170, 0.5)',
				},
				ContainerStyle: {},
				//popover2: 'popover1',
				hovered: false,
			};
		},
		methods: {}
	}
</script>

<style scoped>
</style>
