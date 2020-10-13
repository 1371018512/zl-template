<template>
  <div class="container">
    <zl-menu class="menu"/>
	<el-container class="main">
	  <el-aside width="600px">
		  <zl-news/>
	  </el-aside>
	  <el-main>Main</el-main>
	</el-container>
  </div>
</template>

<script>
import zlMenu from './components/menu.vue'
import zlNews from '../components/News/index.vue'

export default {
  name: 'Layout',
  components: {
    zlMenu,
	zlNews,
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
	.main {
		flex-basis: 700px;
		max-width: 950px;
	}
	.menu {
		width: 100%;
	}
	.container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
