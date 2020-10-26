import {
	login,
	logout,
	getInfo,
	modifyProfile,
	getLikes,
	likeArt
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
	uId: localStorage.getItem('uId'),
	roles: [],
	// 这里存储实际的用户信息
	detail: {
	},
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_UID: (state, uId) => {
		state.uId = uId
	},
	SET_DETAIL: (state, data) => {
		state.detail = data
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
		commit,
		state
	}, img) {
		return new Promise((resolve, reject) => {
			modifyProfile(img).then(response => {
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
				commit('SET_UID', data.uId)
				// 设置浏览器中的cookie
				setStorage(data.token)
				localStorage.setItem('uId',data.uId);
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
	}, uId) {
		return new Promise((resolve, reject) => {
			uId = uId || state.uId
			getInfo(state.uId).then(response => {
				const {
					data
				} = response

				if (!data) {
					reject('Verification failed, please Login again.')
				}

				commit('SET_DETAIL', data)
				
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	getLikes({
		commit,
		state
	}, uId) {
		return new Promise((resolve, reject) => {
			getLikes(uId).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	likeArt({
		commit,
		state
	}, condition) {
		return new Promise((resolve, reject) => {
			likeArt(condition).then(response => {
				resolve(response)
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
				commit('SET_UID', 0)
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				removeStorage()
				localStorage.removeItem('uId')
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
	uId: state => state.uId,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
