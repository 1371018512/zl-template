<template>
	<div>
		<div v-for="(item, i) in data">
			<div class="like">
				<div>
					<zl-profile :data="item.user" :size="50"></zl-profile>
				</div>
				<div class="detail">
					<!-- todo 这里的onlyName迟早去掉 -->
					<zl-name :data="item.user" :onlyName="true"></zl-name>
					点赞了
					<span style="position: absolute;right: 0;">{{formatTime(item.date)}}</span>
					<div class="innerContent">
						{{type(item)}}
					</div>
					<div v-if="item.comment">
						来自: {{item.comment.art.title}}
					</div>
				</div>
			</div>
			<hr v-if="i != data.length - 1" />
		</div>
	</div>
</template>

<script>
	import {
		formatTime
	} from '../../utils/index.js'
	import zlProfile from '@/components/Profile/profile2.vue'
	import zlName from '@/components/name/index.vue'
	
	export default {
		components: {
			zlProfile,
			zlName
		},
		props: {
			data: {},
		},
		data() {
			return {
				formatTime: formatTime,
				map: {
					
				}
			};
		},
		methods: {
			type(obj) {
				if(obj.art) {
					return "我的帖子: " + obj.art.title;
				} else if(obj.blink) {
					return "我的动态: " + obj.blink.content;
				} else {
					return "我的评论: " + obj.comment.content;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.like {
		display: flex;
		margin: 20px 0px;
	}
	
	hr {
		border: none;
		width: 100%;
		transform: scale(1.06);
		border-top: 1px dashed #cfcfcf;
	}
	
	.detail {
		color: #444444;
		position: relative;
		flex: 1;
		padding-left: 10px;
	}
	
	.innerContent {
		color: #838383;
		width: 100%;
		background-color: #f1f1f1;
		padding: 10px;
		margin: 5px;
	}
</style>
