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
		created() {
			//this.ws = new WebSocket("ws://localhost:8181");
		},
		mounted() {
			/* this.ws.onopen = function(e) {
				//成功连接服务器回调
				console.log('客户端（client）：与服务器的websocket已打开')
			}
			
			this.ws.onmessage = function(e) {
				var speedData = JSON.parse(e.data);
				console.log("收到数据：" + JSON.stringify(speedData));
			}; */
		},
		data() {
			return {
				//DialogVisible: false,
				ws: {},
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
