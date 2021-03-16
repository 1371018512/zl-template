import request from "@/utils/request";

export function login(data) {
  return request({
    url: "user/login",
    method: "post",
    data,
  });
}

export function getInfo(uId) {
  return request({
    url: "user/getInfo?" + "uId=" + uId,
    method: "get",
  });
}

export function getInformation(data) {
  return request({
    url: "user/getInformation",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "user/logout",
    method: "post",
  });
}

export function modifyProfile(data) {
  return request({
    url: "user/modifyProfile",
    method: "post",
    data,
  });
}

export function getLikes(data) {
  return request({
    url: "user/getLikes",
    method: "post",
    data,
  });
}

export function getLikeInfo(data) {
  return request({
    url: "info/getLikeInfo",
    method: "post",
    data,
  });
}

export function getCommentInfo(data) {
  return request({
    url: "info/getCommentInfo",
    method: "post",
    data,
  });
}

export function likeArt(data) {
  return request({
    url: "user/likeArt",
    method: "post",
    data,
  });
}

export function oldInfo(data) {
  return request({
    url: "info/oldInfo",
    method: "post",
    data,
  });
}

export function likeComment(data) {
  return request({
    url: "user/likeComment",
    method: "post",
    data,
  });
}

export function modifyInfo(data) {
  return request({
    url: "user/modifyInfo",
    method: "post",
    data,
  });
}

export function follow(data) {
  return request({
    url: "user/follow",
    method: "post",
    data,
  });
}

export function hate(data) {
  return request({
    url: "user/hate",
    method: "post",
    data,
  });
}

export function getInfos(data) {
  return request({
    url: "user/getInfos",
    method: "post",
    data,
  });
}

export function getinfosBysth(data) {
  return request({
    url: "user/getinfosBysth",
    method: "post",
    data,
  });
}

export function getUserGrowHistory(data) {
  return request({
    url: "user/getUserGrowHistory",
    method: "post",
    data,
  });
}
