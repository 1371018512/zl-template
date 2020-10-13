<template>
	<div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1">处理中心</el-menu-item>
			<el-submenu index="2">
				<template slot="title">我的工作台</template>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
			</el-submenu>
			
			<el-menu-item index="5" class="el-menu-left">
				<zl-profile/>
			</el-menu-item>
			<el-menu-item index="3" class="el-menu-left">
				<zl-search/>
			</el-menu-item>
			<el-menu-item index="4" class="el-menu-left"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import zlSearch from '../../components/Search/search.vue'
	import zlProfile from '../../components/Profile/index.vue' // 耦合的组件
	
	export default {
		components: {
		  zlSearch,
		  zlProfile,
		},
		data() {
			return {
				activeIndex: '1',
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.activeIndex);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-menu-demo {
		padding: 0 100px;
	}
	.el-menu-left {
		float: right !important;
	}
</style>
