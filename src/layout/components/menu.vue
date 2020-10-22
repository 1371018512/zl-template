<template>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1" @click.native="$router.push('/')">首页</el-menu-item>
			
			<el-menu-item index="5" class="el-menu-left" >
				<zl-profile/>
			</el-menu-item>
			<el-menu-item index="4" class="el-menu-left" @click.native="$router.push('/information')">
				消息
				<el-badge class="item" :is-dot="true">
				</el-badge>
			</el-menu-item>
			<el-menu-item index="3" class="el-menu-left">
				<zl-search/>
			</el-menu-item>
		</el-menu>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-menu-demo {
		padding: 0 100px;
		z-index: 9990;
	}
	.el-menu-left {
		float: right !important;
	}
	.item {
		transform: translateY(-15px);
		position: absolute;
	}
</style>
