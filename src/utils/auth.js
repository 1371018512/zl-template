/* import Cookies from 'js-cookie' */

const TokenKey = 'Admin-Token'

/* export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
} */

export function getStorage() {
  return localStorage.getItem(TokenKey)
}

export function setStorage(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeStorage() {
  return localStorage.removeItem(TokenKey)
}
