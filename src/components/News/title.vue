<template>
	<div>
		<zl-name :data="news.user"/>
		<span style="display: inline-block;width: 30px;"></span>
		<span>{{action}}</span>
		<span class="pull-right">{{date}}</span>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { formatTime } from '../../utils/index.js'
	import zlName from '@/components/name/index.vue'
	import zlPersonalDetail from '@/components/Popovers/PersonalDetail.vue'
	
	export default {
		components: {
			zlPersonalDetail,
			zlName
		},
		//inject: ['news'],
		computed: {
		  ...mapGetters([
		    'badges',
			'level'
		  ]),
		  date() {
		  	return formatTime(new Date(this.news.date), '{y}-{m}-{d}');
		  },
		},
		props: {
		  index: {
		    type: Number,
		    default:0,
		  },
		  news: {
			  
		  }
		},
		mounted() {
			if(this.news.art && this.news.art.title) {
				this.action = '发表了';
			}else if(this.news.follow){
				this.action = '关注了';
			}else {
				this.action = '说';
			}
		},
		data() {
			return {
				action: '',
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
