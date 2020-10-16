<template>
	<div>
		<img v-popover:popover1 :src="$store.getters['user/userDetail'].profile" :style="hovered?ActiveProfileStyle:ProfileStyle" @mouseover="hovered=true"
		 @mouseout="hovered=false" />
		<el-popover ref="popover1" placement="bottom-end" title="" width="280" trigger="hover" content="">
			<el-container>
				<el-header style="padding: 0;height: 30px;">
					<el-row type="flex" class="row-bg" justify="space-between">
						<el-col :span="15" style="line-height: 30px;font-size: 10px;">{{$store.getters['user/userDetail'].userName}}</el-col>
						<el-col :span="8">
							<el-button plain size="mini">个人主页</el-button>
						</el-col>
					</el-row>
				</el-header>
				<el-main class="img-container" @mouseover.native="hoverEffectIn($event)" @mouseleave.native="hoverEffectOut($event)">
					<el-col :span="7" v-for="(item, index) in imgs" :key="index" style="text-align: center; cursor: pointer;" :class="{'dark-back' : index == activeImg}"
					 :data-index="index">
						<img :src="item.src" style="width: 50%;">
						<div>{{item.name}}</div>
					</el-col>
				</el-main>
				<el-footer class="footer">
					<el-col @mouseover.native="ButtonIn($event)" @mouseleave.native="ButtonOut($event)" :span="11" style="text-align: center; cursor: pointer;">
						<div>
							<i class="el-icon-setting"></i>
							{{footerButton[0].name}}
						</div>
					</el-col>
					<el-col @mouseover.native="ButtonIn($event)" @mouseleave.native="ButtonOut($event)" @click.native="handleLogout"
					 :span="11" style="text-align: center; cursor: pointer;">
						<div>
							<i class="el-icon-circle-close"></i>
							{{footerButton[1].name}}
						</div>
					</el-col>
				</el-footer>
			</el-container>
		</el-popover>
	</div>
</template>

<script>
	
	export default {
		props: {
			size: {
				type: Number,
				default: 40,
			},
			src: {
				default: require('../../assets/logo.png')
			}
		},
		created() {},
		data() {
			return {
				ProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					border: '2px solid #e7e7e7',
				},
				ActiveProfileStyle: {
					width: this.size + 'px',
					height: this.size + 'px',
					borderRadius: Math.floor(this.size / 2) + 'px',
					border: '2px solid rgba(64, 158, 255, .5)',
					boxShadow: '0 0 5px rgba(64, 158, 255, .5)',
				},
				ContainerStyle: {},
				//popover2: 'popover1',
				hovered: false,
				// todo: 数据不该放在此处
				imgs: [{
						src: require("../../assets/logo.png"),
						name: '收藏'
					},
					{
						src: require("../../assets/logo.png"),
						name: '收藏'
					},
					{
						src: require("../../assets/logo.png"),
						name: '收藏'
					},
					{
						src: require("../../assets/logo.png"),
						name: '收藏'
					},
					{
						src: require("../../assets/logo.png"),
						name: '收藏'
					},
					{
						src: require("../../assets/logo.png"),
						name: '收藏'
					},
				],
				activeImg: -1,
				footerButton: [{
						name: '账号设置'
					},
					{
						name: '退出登录'
					},
				]
			};
		},
		methods: {
			hoverEffectIn(e) {
				let t = e.target;
				if (t.dataset && t.dataset.index) {
					this.activeImg = t.dataset.index;
				} else if (t.parentElement.dataset && t.parentElement.dataset.index) {
					this.activeImg = t.parentElement.dataset.index;
				}
				e.stopPropagation();
			},
			hoverEffectOut(e) {
				this.activeImg = -1;
				e.stopPropagation();
			},
			ButtonIn(e) {
				let t = e.currentTarget;
				t.classList.add('hoverButton');
			},
			ButtonOut(e) {
				let t = e.currentTarget;
				t.classList.remove('hoverButton');
			},
			handleLogout() {
				this.$store.dispatch('user/logout', this.loginForm)
					.then(() => {
						this.$message({
							message: '成功退出登录！',
							type: 'success'
						});
						this.$router.push({
							path: '/login',
							query: this.otherQuery
						})
					})
					.catch((err) => {
						console.log(err)
					})
			},
		}
	}
</script>

<style scoped>
	.img-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.dark-back {
		background-color: #d2dcee;
		border-radius: 5px;
		transition: all 0.5s;
	}

	.footer {
		padding: 0;
		display: flex;
		justify-content: space-between;
		height: 30px !important;
	}

	.hoverButton {
		transition: all 0.2s;
		color: rgba(64, 158, 255, .9);
	}
</style>
