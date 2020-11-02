import request from '@/utils/request'

export function getTalk(data) {
  return request({
    url: 'talk/getTalk',
    method: 'post',
    data
  })
}

export function submitTalk(data) {
  return request({
    url: 'talk/submitTalk',
    method: 'post',
    data
  })
}

export function readAll(data) {
  return request({
    url: 'talk/readAll',
    method: 'post',
    data
  })
}

export function deleteTalk(data) {
  return request({
    url: 'talk/deleteTalk',
    method: 'post',
    data
  })
}