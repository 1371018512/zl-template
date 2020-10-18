import {
	login,
	logout,
	getInfo,
	modifyProfile
} from '@/api/user'
import {
	getStorage,
	setStorage,
	removeStorage
} from '@/utils/auth'
import router, {
	resetRouter
} from '@/router'

const state = {
	// 这几个值我不会去使用
	name: '',
	avatar: '',
	introduction: '',
	// 这几个值权限登录相关,单独列出来
	token: getStorage(),
	roles: [],
	// 这里存储实际的用户信息
	detail: {
		id: 992973331,
		introduction: '我是一个保安，爱吃小熊饼干',
		education: '本科',
		base: '杭州',
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
			name: '字节跳动_Data_后端开发工程师',
			type: 'trainee',
		}, ],
		userLevel: 6,
		profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
	},
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	}
}

const actions = {
	// 上传
	modifyProfile({
		commit
	}, img) {
		return new Promise((resolve, reject) => {
			modifyProfile(img).then(response => {
				//console.log(response)
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	// user login
	login({
		commit
	}, userInfo) {
		const {
			username,
			password
		} = userInfo
		return new Promise((resolve, reject) => {
			login({
				username: username.trim(),
				password: password
			}).then(response => {
				const {
					data
				} = response
				// 设置vuex
				commit('SET_TOKEN', data.token)
				// 设置浏览器中的cookie
				setStorage(data.token)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	// 这里动态生成roles
	getInfo({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			getInfo(state.token).then(response => {
				const {
					data
				} = response

				if (!data) {
					reject('Verification failed, please Login again.')
				}

				const {
					roles,
					name,
					avatar,
					introduction
				} = data

				// roles must be a non-empty array
				if (!roles || roles.length <= 0) {
					reject('getInfo: roles must be a non-null array!')
				}

				commit('SET_ROLES', roles)
				commit('SET_NAME', name)
				commit('SET_AVATAR', avatar)
				commit('SET_INTRODUCTION', introduction)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// user logout
	logout({
		commit,
		state,
		dispatch
	}) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				removeStorage()
				resetRouter()

				// reset visited views and cached views
				// to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
				dispatch('tagsView/delAllViews', null, {
					root: true
				})

				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeStorage()
			resolve()
		})
	},

	// dynamically modify permissions
	async changeRoles({
		commit,
		dispatch
	}, role) {
		const token = role + '-token'

		commit('SET_TOKEN', token)
		setStorage(token)

		const {
			roles
		} = await dispatch('getInfo')

		resetRouter()

		// generate accessible routes map based on roles
		const accessRoutes = await dispatch('permission/generateRoutes', roles, {
			root: true
		})
		// dynamically add accessible routes
		router.addRoutes(accessRoutes)

		// reset visited views and cached views
		dispatch('tagsView/delAllViews', null, {
			root: true
		})
	}
}

const getters = {
	userDetail: state => state.detail,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
