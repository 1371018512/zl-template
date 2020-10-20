<template>
	<el-container class="con">
		<el-header class="head" height="80px">
			<!-- <el-dialog :visible.sync="DialogVisible" width="600px" top="75px">
				<template v-slot:title>
					<zl-title data="头像修改"></zl-title>
				</template>
				<zl-profile-upload @uploaded="DialogVisible=false"/>
			</el-dialog> -->
			<zl-header style="height: 100%;"/>
		</el-header>
		<el-container>
			<el-aside width="250px" class="aside">
				<el-menu default-active="1" class="el-menu-vertical-demo">
					<el-menu-item index="1" @click.native="routerGo('/person/index/' + $route.params.u_id)">
						<span class="iconfont">&#xe625;</span>
						<span slot="title">
							基础资料
						</span>
					</el-menu-item>
					<el-menu-item index="2" @click.native="routerGo('/person/post/' + $route.params.u_id)">
						<span class="iconfont">&#xe605;</span>
						<span slot="title">
							讨论帖
						</span>
					</el-menu-item>
					<el-menu-item index="3" @click.native="routerGo('/person/achievement/' + $route.params.u_id)">
						<span class="iconfont">&#xe627;</span>
						<span slot="title">
							成就
						</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import zlHeader from './header.vue'
	import zlTitle from '@/components/common/title.vue'
	// import zlProfileUpload from './profileUpload.vue'
	
	export default {
		components: {
			zlHeader,
			zlTitle,
			// zlProfileUpload,
		},
		computed: {

		},
		watch: {

		},
		provide() {
			return {};
		},
		mounted() {
		},
		data() {
			return {
				oneself: this.$route.params.u_id == this.$store.getters['user/userDetail'].id,
			};
		},
		provide() {
			return {
				oneself: this.oneself,
			};
		},
		methods: {
			routerGo(to) {
				if(to == this.$route.path) {
					return;
				}
				this.$router.push(to);
			}
		}
	}
</script>

<style scoped lang="scss">
	.con {
		margin-top: 60px;
		flex-basis: 700px;
		max-width: 950px;
	}

	.head,
	.aside,
	.main {
		margin: 10px;
		border-radius: 5px;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
	}

	.aside {
		padding: 0;
	}
</style>
