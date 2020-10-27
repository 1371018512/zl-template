<template>
	<el-container class="con">
		<el-dialog :visible.sync="DialogVisible" width="700px" top="75px" ref="div">
			<template v-slot:title>
				<svg class="icon" aria-hidden="true" style="font-size: 25px;">
					<use xlink:href="#el-icon-zlliaotian"></use>
				</svg>
				<span>{{$store.getters['art/art'].title}}</span>
			</template>
			<zl-art-detail @Refresh="getArts"/>
		</el-dialog>
		<el-header class="head" height="80px">
			<zl-header style="height: 100%;"/>
		</el-header>
		<el-container>
			<el-aside width="250px" class="aside">
				<el-menu class="el-menu-vertical-demo">
					<el-menu-item index="1" @click.native="routerGo('/person/index/' + $route.params.u_id)">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#el-icon-zlwode"></use>
						</svg>
						<span slot="title">
							基础资料
						</span>
					</el-menu-item>
					<el-menu-item index="2" @click.native="routerGo('/person/post/' + $route.params.u_id)">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#el-icon-zlshijian"></use>
						</svg>
						<span slot="title">
							讨论帖
						</span>
					</el-menu-item>
					<el-menu-item index="3" @click.native="routerGo('/person/achievement/' + $route.params.u_id)">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#el-icon-zlxunzhang"></use>
						</svg>
						<span slot="title">
							成就
						</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<keep-alive>
					<router-view @goDetail="goDetail"></router-view>
				</keep-alive>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import zlHeader from './header.vue'
	import zlTitle from '@/components/common/title.vue'
	// import zlProfileUpload from './profileUpload.vue'
	import zlArtDetail from '@/views/artDetail/index.vue'
	
	export default {
		components: {
			zlHeader,
			zlTitle,
			zlArtDetail
		},
		computed: {

		},
		watch: {

		},
		mounted() {
			// 默认是自己，以后弄了多用户再改
			this.$store.dispatch('user/getInfo', this.$route.params.u_id).then((data) => {
				this.user = data;
			}).catch(error => {
				console.log(error)
			})
		},
		data() {
			return {
				user: {},
				DialogVisible: false,
				oneself: this.$route.params.u_id == this.$store.getters['user/userDetail'].uId,
			};
		},
		provide() {
			return {
				oneself: this.oneself,
				ReactiveUser: () => this.user,
			};
		},
		methods: {
			routerGo(to) {
				if(to == this.$route.path) {
					return;
				}
				this.$router.push(to);
			},
			goDetail() {
				this.DialogVisible = true
			},
			getArts() {
				
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
	
	.icon {
		font-size: 25px;
	}
</style>
