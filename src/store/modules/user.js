import {
	login,
	logout,
	getInfo,
	modifyProfile,
	getLikes,
	likeArt,
	likeComment,
	modifyInfo,
	getInformation,
	getLikeInfo,
	getCommentInfo,
	oldInfo,
	follow,
	getInfos,
	getinfosBysth,
	hate,
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
	artLikes: [],
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
	},
	SET_ART_LIKES: (state, data) => {
		state.artLikes = data
	},
	toggleArtLike: (state, aId) => {
		if(state.artLikes.find((item) => item == aId)) {
			state.artLikes.splice(state.artLikes.findIndex((item) => aId == item), 1)
		}else {
			state.artLikes.push(aId)
		}
	},
	oldInfo: (state) => {
		state.detail.newsInfo = false;
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
			getInfo(uId).then(response => {
				// 已经设置过就纯拿data
				if(state.detail.nickName) {
					resolve(response.data);
				}else {
					const {
						data
					} = response
					
					if (!data) {
						reject('Verification failed, please Login again.')
					}
					
					commit('SET_DETAIL', data)
					
					resolve(data)
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 根据id获取users
	getInfos({
		commit,
		state
	}, uIds) {
		return new Promise((resolve, reject) => {
			getInfos(uIds).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 根据自定义条件获取指定个数的用户信息
	getinfosBysth({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			getinfosBysth(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 修改用户资料
	modifyInfo({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			modifyInfo(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	getLikes({
		commit,
		state
	}, uId) {
		uId = uId || state.uId
		return new Promise((resolve, reject) => {
			getLikes({uId: uId}).then(response => {
				let data = response.data;
				commit('SET_ART_LIKES', data.artLikes);
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	getInformation({
		commit,
		state
	}, condition) {
		return new Promise((resolve, reject) => {
			getInformation(condition).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	getLikeInfo({
		commit,
		state
	}, arr) {
		return new Promise((resolve, reject) => {
			getLikeInfo(arr).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	getCommentInfo({
		commit,
		state
	}, arr) {
		return new Promise((resolve, reject) => {
			getCommentInfo(arr).then(response => {
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
	
	oldInfo({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			oldInfo(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	likeComment({
		commit,
		state
	}, condition) {
		return new Promise((resolve, reject) => {
			likeComment(condition).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	follow({
		commit,
		state
	}, dat) {
		return new Promise((resolve, reject) => {
			follow(dat).then(response => {
				let data = response.data;
				let temp = state.detail;
				if(data == 1) {
					temp.followIds.push(dat.tId);
					// 在本地移除黑名单
					temp.hateIds.splice(temp.hateIds.findIndex((item) => {
						return item == dat.tId;
					}), 1);
				}else {
					temp.followIds.splice(temp.followIds.findIndex((item) => {
						return item == dat.tId;
					}), 1);
				}
				state.detail = temp;
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	hate({
		commit,
		state
	}, dat) {
		return new Promise((resolve, reject) => {
			hate(dat).then(response => {
				let data = response.data;
				let temp = state.detail;
				if(data == 1) {
					temp.hateIds.push(dat.tId);
					// 在本地移除关注
					temp.followIds.splice(temp.followIds.findIndex((item) => {
						return item == dat.tId;
					}), 1);
				}else {
					temp.hateIds.splice(temp.hateIds.findIndex((item) => {
						return item == dat.tId;
					}), 1);
				}
				state.detail = temp;
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
				commit('SET_DETAIL', {})
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
	artLikes: state => state.artLikes,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
