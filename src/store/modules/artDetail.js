const state = {
	user: {
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
		comments: {
			length: 1,
			data: [{
				id: 1,
				user: {
					artId: 1,
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
				content: '啊，老姐之前不是都到hr面了？',
				date: new Date(),
				recomments: {
					length: 2,
					data: [{
						id: 2,
						user: {
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
						target: {
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
						content: '对啊对啊',
						date: new Date(),
						recomments: {
							length: 0,
							data: [],
						},
						likes: 1,
						mothserId: 1, //id != motherid的后续回复添加到mother上
					}, {
						id: 3,
						user: {
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
						target: {
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
						content: '对啊对啊',
						date: new Date(),
						recomments: {
							length: 0,
							data: [],
						},
						likes: 1,
						mothserId: 1, //id != motherid的后续回复添加到mother上
					}],
				},
				likes: 1,
				mothserId: 1,
			}, ],
		},
		views: 1126,
	},
}

const mutations = {}

const actions = {}

const getters = {
	user: state => state.user,
	art: state => state.art,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
