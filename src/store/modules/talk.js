import {
	getTalk,
	submitTalk,
	readAll,
	deleteTalk
} from '@/api/talk'

const state = {
}

const actions = {
	// 拿到或者创建然后拿到对话
	getTalk({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			getTalk(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	submitTalk({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			submitTalk(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	deleteTalk({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			deleteTalk(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	readAll({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			readAll(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
}

const mutations = {
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}