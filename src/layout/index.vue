<template>
	<div class="container">
		<zl-menu class="menu" />
		<!-- <el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail @Refresh="getArts"/>
		</el-dialog> -->
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
			return {
				//DialogVisible: false,
			};
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
