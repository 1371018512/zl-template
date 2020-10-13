<template>
	<div class="container">
		<el-container>
			<el-aside width="60px" class="profileContainer">
				<zl-profile2 />
			</el-aside>
			<el-container>
				<el-header class="title" height="35px">
					<zl-title/>
				</el-header>
				<el-main class="art-body">
					<zl-art/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import zlProfile2 from '../Profile/profile2.vue'
	import zlTitle from './title.vue'
	import zlArt from './art.vue'
	
	export default {
		components: {
			zlProfile2,
			zlTitle,
			zlArt
		},
		data() {
			return {};
		},
		methods: {}
	}
</script>

<style scoped="">
	.container {
		width: 100%;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
	}

	.profileContainer {
		padding: 5px;
		display: flex;
		justify-content: center;
	}
	
	.title {
		height: 35px;
		padding-left: 5px;
	}
	
	.art-body {
		padding: 0 20px 0 5px;
	}
</style>
