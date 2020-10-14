<template>
	<div class="container">
		<el-container>
			<el-aside width="60px" class="profileContainer">
				<zl-profile2 :src="news[index].user.profile" v-popover:popover1 />
				<el-popover ref="popover1" placement="bottom-end" title="" width="350" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
					<img :src="background" class="image" />
					<div class="base">
						<span>
							<span class="iconfont">&#xe612;</span>
							{{news[index].user.school}}
						</span>
						<span>
							<span class="iconfont">&#xe659;</span>
							{{news[index].user.graduationYear + '毕业'}}
						</span>
						<span>
							<span class="iconfont">&#xe662;</span>
							{{news[index].user.direction}}
						</span>
					</div>
				</el-popover>
			</el-aside>
			<el-container>
				<el-header class="title" height="35px">
					<zl-title :index="index" />
				</el-header>
				<el-main class="art-body">
					<zl-art :index="index" v-if="news[index].art" />
					<zl-follow :index="index" v-else-if="news[index].follow" />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import zlProfile2 from '../Profile/profile2.vue'
	import zlTitle from './title.vue'
	import zlArt from './art.vue'
	import zlFollow from './follow.vue'
	import zlProfile2Popover from '../Popovers/Profile2.vue'

	export default {
		components: {
			zlProfile2,
			zlTitle,
			zlArt,
			zlFollow,
			zlProfile2Popover,
		},
		inject: ['news'],
		props: {
			index: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				background: require('../../assets/background.png'),
			};

		},
		methods: {}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
		margin-top: 13px;
		box-shadow: 0 0 5px #eeeeee;
	}

	.profileContainer {
		padding: 5px;
		display: flex;
		background-color: transparent;
		justify-content: center;
		height: 50px;
	}

	.title {
		height: 35px;
		padding-left: 5px;
	}

	.art-body {
		padding: 0 20px 0 5px;
	}

	.image {
		width: 100%;
		transform: scale(1.129);
		display: block;
		position: relative;
		top: -9px;
		border-radius: 3px 3px 0 0;
		opacity: 0.89;
	}

	.base>span {
		line-height: 2.3em;
		display: inline-block;
		padding-right: 15px;
		color: #6d6d6d;
	}
</style>
