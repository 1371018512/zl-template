<template>
	<div class="container1">
		<div style="font-size: 10px;word-break: break-all;word-wrap:break-word;">
			<zl-name :data="data.user"/>
			{{' 回复 '}}
			<zl-name :data="data.target"/>
			:{{data.recomment.content}}
		</div>
		<div>
			<div>
				发表于{{formatTime(new Date(data.recomment.date), '{y}-{m}-{d}')}}
			</div>
			<div>
				<span @click="likeComment">
					赞({{data.recomment.likes}})
				</span>
				<span @click="publishRecomment">回复</span>
				<span>举报</span>
			</div>
		</div>
	</div>
</template>

<script>
	import zlProfile from '@/components/Profile/profile2.vue'
	import { formatTime } from '../../utils/index.js'
	import {
		mapGetters
	} from 'vuex'
	import zlName from '@/components/name/index.vue'
	
	export default {
		name: 'comment',
		components: {
			zlProfile,
			zlName,
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
		},
		watch: {
		
		},
		props: {
			data: {},
		},
		mounted() {
		},
		data() {
			return {
				formatTime: formatTime,
			}
		},
		methods: {
			publishRecomment() {
				this.$emit('openInput', this.data.user.uId, this.data.recomment.content);
			},
			likeComment() {
				this.$store.dispatch('user/likeComment', {
						uId: this.$store.getters['user/uId'],
						cId: this.data.recomment.id,
					})
					.then((data) => {
						data = data.data;
						this.data.recomment.likes += data;
						this.$forceUpdate();
					})
					.catch((err) => {
						console.log(err);
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container1 {
		font-size: 10px;
		> :nth-child(2) {
			display: flex;
			justify-content: space-between;
			padding: 10px 0;
			font-size: 10px;
			color: #939393;
			span {
				padding: 0 5px;
				color: #25bb9b;
				cursor: pointer;
			}
		}
	}
</style>
