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
