const state = {
	user: {
		sex: 0,
		belikes: 1100,
		becollects: 1001,
		codePass: 30,
		problemPass: 37,
		highquiltyOutput: 100,
		userName: '今天也是没有收到offer的一天',
		school: '华侨大学',
		graduationYear: 2021,
		direction: 'java工程师',
		badgeList: [{
			name: '字节跳动_Data_后端开发工程师(准入职)',
			type: 'trainee',
		}, ],
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
		comments: {
			length: 6,
			data: ['', '', '', '', '', ''],
		},
		views: 1126,
	},
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}