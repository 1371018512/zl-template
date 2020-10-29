import {
	//submitBlink,
	submitArt,
	getArts,
	submitComment,
	getComments,
	getArtsIcomment
} from '@/api/article'

const state = {
	user: {
	},
	art: {
	},
	comments: [],
}

const mutations = {
	showDetail(state) {
		state.showDetail = true;
	},
	setArt(state, data) {
		state.art = data;
	},
	setComments(state, data) {
		state.comments = data;
	},
	modifyLikes(state,data) {
		state.art.likes += data;
	},
	addCommentIds(state, data) {
		state.art.commentIds.push(data);
	},
	setUser(state, data) {
		state.user = data;
	},
	addComment(state, data) {
		state.comments.push(data);
	}
}

const actions = {
	submitBlink({
		commit,
		state
	}, blink) {
		return new Promise((resolve, reject) => {
			submitArt(blink).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	submitArt({
		commit,
		state
	}, art) {
		return new Promise((resolve, reject) => {
			submitArt(art).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	submitComment({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			submitComment(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	getArts({
		commit,
		state
	}, condition) {
		return new Promise((resolve, reject) => {
			getArts(condition).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	getArtsIcomment({
		commit,
		state
	}, condition) {
		return new Promise((resolve, reject) => {
			getArtsIcomment(condition).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	getComments({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			getComments(data).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
}

const getters = {
	user: state => state.user,
	art: state => state.art,
	comments: state => state.comments
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
