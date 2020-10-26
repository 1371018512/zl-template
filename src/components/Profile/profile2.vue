<template>
	<div>
		<img :src="data.profile" :style="hovered?ActiveProfileStyle:ProfileStyle" @mouseover="hovered=true"
		 @mouseout="hovered=false" @click="goPerson"/>
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
		mounted() {},
		data() {
			return {
				ProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					cursor: 'pointer',
				},
				ActiveProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					cursor: 'pointer',
					//boxShadow: '0 0 5px rgba(170, 170, 170, 0.5)',
				},
				ContainerStyle: {},
				//popover2: 'popover1',
				hovered: false,
			};
		},
		methods: {
			goPerson() {
				this.$router.push({ path: '/person/index/' + this.data.uId })
			}
		}
	}
</script>

<style scoped>
</style>
