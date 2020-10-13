<template>
	<div>
		<span :style="{ color: level[userLevel].color }">{{userName}}</span>
		<img :src="badges[badgeList[0].type]"/>
		<span style="display: inline-block;width: 30px;"></span>
		<span>{{action}}</span>
		<span class="pull-right">{{date}}</span>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { formatTime } from '../../utils/index.js'
	
	export default {
		components: {
		},
		computed: {
		  ...mapGetters([
		    'badges',
			'level'
		  ])
		},
		props: {
		  data: {
		    default: function() {
				return {
					userName: '今天也是没有收到offer的一天',
					badgeList: [
						{ 
							name:'字节跳动_Data_后端开发工程师(准入职)',
							type:'trainee',
						},
					],
					action: '发表了',
					date: new Date(),
					userLevel: 6,
				}
			},
		  },
		  jj: {
			default: '11'
		  }
		},
		data() {
			return {
				userName: this.data.userName,
				badgeList: this.data.badgeList,
				action: this.data.action,
				date: formatTime(this.data.date, '{y}-{m}-{d}'),
				userLevel: this.data.userLevel,
			};
		},
		methods: {}
	}
</script>

<style scoped>
	* {
		font-size: 13px;
		color: #a2a2a2;
	}
	img{
	vertical-align: middle;
	}
	.pull-right {
		display: inline-block;
		float: right;
	}
	
</style>
