<template>
	<div>
		<div class="tName">
			<div>
				与 <zl-name :data="talk.target" :onlyName="true"/> 的对话
			</div>
		</div>
		<div style="overflow: hidden;">
			<zl-chat :data="item" v-for="(item, i) in talk.talks" :left="talk.target.id == item.user.id"/>
		</div>
		
		<div>
			<div class="buttons"></div>
			<div>
				<el-input type="textarea" v-model="commentContent" placeholder="请在这里添加你的回帖吧"></el-input>
				<div class="submit">
					<el-button type="primary" size="small">发送</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import zlName from '@/components/name/index.vue'
	import zlProfile from '@/components/Profile/profile2.vue'
	import { formatTime } from '../../utils/index.js'
	import zlChat from '@/components/chat/index.vue'
	
	export default {
		components: {
			zlName,
			zlProfile,
			zlChat
		},
		computed: {
		},
		watch: {
	
		},
		provide() {
			return {};
		},
		mounted() {
			console.log(this.$route.params.t_id)
		},
		data() {
			return {
				commentContent: '',
				formatTime: formatTime,
				talk: {
					target: {
						id: 992973332,
						introduction: '我是一个保安，爱吃小熊饼干',
						education: '本科',
						base: '杭州',
						sex: 1,
						belikes: 1100,
						becollects: 1001,
						codePass: 30,
						problemPass: 37,
						highquiltyOutput: 100,
						badgeList: [{
							name: '字节跳动_Data_后端开发工程师',
							type: 'trainee',
						}, ],
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						userName: 'shining4code',
						school: '浙江大学',
						graduationYear: 2021,
						direction: '产品',
					},
					talks: [{
						date: new Date(),
						content: '你好啊!!!!!!!!!!!!!',
						user: {
							id: 992973332,
							userName: 'shining4code',
							profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						}
					},{
						date: new Date(),
						content: '你也好!!!!!!!!!!!!!',
						user: {
							id: 992973331,
							userName: '今天也是没有收到offer的一天',
							profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
						}
					}]
				}
			};
		},
		methods: {}
	}
</script>

<style scoped>
	.tName {
		display: flex;
		justify-content: center;
	}
	.buttons {
		padding: 10px 5px;
	}
	.con {
	}
	.submit {
		margin-top: 10px;
		float: right;
	}
</style>
