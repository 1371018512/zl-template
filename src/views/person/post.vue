<template>
	<div class="container">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="我发布的帖子" name="publish"></el-tab-pane>
			<el-tab-pane label="我回复的帖子" name="reply"></el-tab-pane>
		</el-tabs>
		<zl-title :data="data[activeTab].title + `(${data[activeTab].data.length})`" size="16" />
		<div v-for="(item, i) in data[activeTab].data" class="art">
			<zl-art :data="item.art" :needTags="false" :needDate="true" :replaceContent="item.content"/>
			<hr v-if="i != data[activeTab].data.length - 1 " />
		</div>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue'
	import zlArt from '@/components/News/art.vue'

	export default {
		components: {
			zlTitle,
			zlArt
		},
		computed: {},
		watch: {

		},
		provide() {},
		created() {},
		data() {
			return {
				activeTab: 'publish',
				data: {
					'publish': {
						title: '发布的帖子',
						data: [{
							user: {
								uId: 992973331,
								introduction: '我是一个保安，爱吃小熊饼干',
								education: '本科',
								base: '杭州',
								sex: 0,
								belikes: 1100,
								becollects: 1001,
								codePass: 30,
								problemPass: 37,
								highquiltyOutput: 100,
								nickName: '今天也是没有收到offer的一天',
								school: '华侨大学',
								graduationYear: 2021,
								direction: 'java工程师',
								identity: {
									name: '字节跳动_Data_后端开发工程师',
									type: 'trainee',
								},
								userLevel: 6,
								profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
							},
							art: {
								title: '网易互联网面试是否可推迟',
								content: `
				rt，网易云笔试挂了，被转推到其他部门（企业研发部门），可能是因为提前批面到了hr。
				本来约的18号下午面试，现因个人原因（家庭变故）无法参加，时间和个人状态都不行，不知道能不能延迟一周时间。
				公众号后台已经问过了还没回应，如果实在不行就放弃了。秋招也结束了。
				
				其实有点自暴自弃，但是，对不起。`,
								tag: [
									'网易互联网',
								],
								topic: [
									'网易',
									'面试'
								],
								date: new Date(),
								lastModify: new Date(),
								likes: 2,
								collects: 0,
								comments: ['', '', '', '', '', ''],
								views: 1126,
							},
							date: new Date(),
						}]
					},
					'reply': {
						title: '回复的帖子',
						data: [{
							id: 1,
							user: {
								sex: 1,
								belikes: 1100,
								becollects: 1001,
								codePass: 30,
								problemPass: 37,
								highquiltyOutput: 100,
								identity: {
									name: '字节跳动_Data_后端开发工程师',
									type: 'trainee',
								},
								profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
								userLevel: 2,
								nickName: 'shining4code',
								school: '浙江大学',
								graduationYear: 2021,
								direction: '产品',
							},
							target: {
								sex: 0,
								belikes: 1100,
								becollects: 1001,
								codePass: 30,
								problemPass: 37,
								highquiltyOutput: 100,
								nickName: '今天也是没有收到offer的一天',
								school: '华侨大学',
								graduationYear: 2021,
								direction: 'java工程师',
								identity: {
									name: '字节跳动_Data_后端开发工程师',
									type: 'trainee',
								},
								userLevel: 6,
								profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
							},
							art: {
								title: '网易互联网面试是否可推迟',
								content: `
				rt，网易云笔试挂了，被转推到其他部门（企业研发部门），可能是因为提前批面到了hr。
				本来约的18号下午面试，现因个人原因（家庭变故）无法参加，时间和个人状态都不行，不知道能不能延迟一周时间。
				公众号后台已经问过了还没回应，如果实在不行就放弃了。秋招也结束了。
				
				其实有点自暴自弃，但是，对不起。`,
								tag: [
									'网易互联网',
								],
								topic: [
									'网易',
									'面试'
								],
								date: new Date(),
								lastModify: new Date(),
								likes: 2,
								collects: 0,
								comments: ['', '', '', '', '', ''],
								views: 1126,
							},
							content: '啊，老姐之前不是都到hr面了？',
							date: new Date(),
							recomments: [],
							likes: 1,
							motherId: 1,
						}, ]
					},
				},
			}
		},
		methods: {
			onSubmit() {

			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
	}

	.header {
		width: 100%;
		height: 50px;
		font-size: 15px;
		color: #6f6f6f;
	}

	hr {
		border: none;
		width: 100%;
		border-top: 1px solid #cfcfcf;
	}

	.artTitle {
		font-size: 14px;
	}

	.artContent {
		font-size: 13px;
		color: #888888;
		padding: 6px 3px;
	}

	.art {
		margin-top: 10px;
	}

	.green {
		color: #25bb9b;
		cursor: pointer;
	}
</style>
