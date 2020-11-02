import request from '@/utils/request'

export function submitBlink(data) {
  return request({
    url: 'art/submitBlink',
    method: 'post',
    data
  })
}

export function submitArt(data) {
  return request({
    url: 'art/submitArt',
    method: 'post',
    data
  })
}

export function submitArtHistory(data) {
  return request({
    url: 'user/submitArtHistory',
    method: 'post',
    data
  })
}
export function getArts(data) {
  return request({
    url: 'art/getArts',
    method: 'post',
    data
  })
}

export function getArtsIcomment(data) {
  return request({
    url: 'art/getArtsIcomment',
    method: 'post',
    data
  })
}

export function submitComment(data) {
  return request({
    url: 'comment/submitComment',
    method: 'post',
    data
  })
}

export function getComments(data) {
  return request({
    url: 'comment/getComments',
    method: 'post',
    data
  })
}

export function getBlinks(data) {
  return request({
    url: 'art/getBlinks',
    method: 'post',
    data
  })
}

export function getArtHistory(data) {
  return request({
    url: 'user/getArtHistory',
    method: 'post',
    data
  })
}