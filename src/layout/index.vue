<template>
	<div class="container">
		<zl-menu class="menu" />
		<router-view></router-view>
	</div>
</template>

<script>
	import zlMenu from './components/menu.vue'

	export default {
		name: 'Layout',
		components: {
			zlMenu,
		},
		computed: {

		},
		data() {
			return {};
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.menu {
		width: 100%;
		position: fixed;
	}

	.container {
		background-color: #eef1f6;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
