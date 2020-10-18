<template>
	<div class="container">
		<el-container>
			<el-aside width="60px" class="profileContainer">
				<zl-profile2 :data="news[index].user" v-popover:popover1 />
				<el-popover ref="popover1" placement="bottom" title="" width="350" trigger="hover" content="">
					<zl-personal-detail
						:index="index"
						:data="news[index].user"
					/>
				</el-popover>
			</el-aside>
			<el-container>
				<el-header class="title" height="35px">
					<zl-title :index="index" />
				</el-header>
				<el-main class="art-body">
					<zl-art v-if="news[index].art" :data="news[index].art"/>
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
	import zlPersonalDetail from '../Popovers/PersonalDetail.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {
			zlProfile2,
			zlTitle,
			zlArt,
			zlFollow,
			zlPersonalDetail
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
		},
		mounted() {
			
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
</style>
