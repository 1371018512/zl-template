import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getInfo(uId) {
  return request({
    url: 'user/getInfo?' + 'uId=' + uId,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}

export function modifyProfile(data) {
  return request({
    url: 'user/modifyProfile',
    method: 'post',
	data,
  })
}

export function getLikes(data) {
  return request({
    url: 'user/getLikes',
    method: 'post',
	data,
  })
}


export function likeArt(data) {
  return request({
    url: 'user/likeArt',
    method: 'post',
    data
  })
}