import Cookies from 'js-cookie'
const TOKEN_COOKIE = 'auth_token'
const USER_COOKIE = 'auth_user'

// ------ Працюємо з токеном -----------
export function updateToken(token: string) {
  Cookies.set(TOKEN_COOKIE, token, { expires: 30, sameSite: 'Strict' })
}
export function getToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE)
}
export function removeToken() {
  Cookies.remove(TOKEN_COOKIE)
}
// ------ Працюємо з userId -----------
export function updateUserId(userId: string) {
  Cookies.set(USER_COOKIE, userId, { expires: 30, sameSite: 'Strict' })
}
export function getUserId(): string | undefined {
  return Cookies.get(USER_COOKIE)
}
export function removeUserId() {
  Cookies.remove(USER_COOKIE)
}