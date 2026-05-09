import axios from 'axios'
import { getToken, getUserId, removeToken, removeUserId } from '@/utils/cookies'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'


export const http = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  if(config.url?.includes("/auth/register") || config.url?.includes("/auth/login")) {
    removeToken()
    removeUserId()
  } else {
    const token = getToken()
    const userId = getUserId()
    if (token) config.headers.Authorization = token
    if (userId) config.params = { ...config.params, userId }
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    const data = response.data as any
    if (data?.status === 'error' && data?.error === 'no auth') {
      handleAuthError()
      return
    } else if(data?.status !== 'done') {
      return Promise.reject()
    }
    return response.data?.data as any
  },
  (error) => {
    const errorRes = error?.response
    const errorResData = errorRes?.data
    if (errorRes?.status === 401 || (errorResData?.status === 'error' && errorResData?.error === 'no auth')) {
      handleAuthError()
    }
    return Promise.reject(error)
  },
)

function handleAuthError() {
  removeToken()
  removeUserId()

  // Lazy imports avoid circular dependency (store and router both import from API)
  import('@/stores/authStore').then(({ useAuthStore }) => {
    useAuthStore().logout()
  })

  import('@/router').then(({ default: router }) => {
    const noRedirectRoutes = ['/welcome', '/register', '/login']
    if (!noRedirectRoutes.includes(router.currentRoute.value.path)) {
      router.replace('/welcome')
    }
  })
}

// ── Chats ──────────────────────────────────────────────────────────────────

export class GetStart {
  getStart() {
    return http.get<unknown[]>(`/api/getStart/`)
  }
}

export class Auth {
  login({ email, password }: { email: string, password: string }) {
    return http.post<unknown[]>(`/api/auth/login`, { email, password })
  }
  register({ name, email, password }: { name: string, email: string, password: string }) {
    return http.post<unknown[]>(`/api/auth/register`, { name, email, password })
  }
}

export class User {

}

export class Presets {
  createPreset({ name, description }: { name: string, description: string }) {
    return http.post<unknown[]>(`/api/presets`, { name, description })
  }
  
  updatePreset({ id, name, description }: { id: string, name: string, description: string }) {
    return http.patch<unknown[]>(`/api/presets/${id}`, { id, name, description })
  }
  
  deletePreset(id: string) {
    return http.delete<unknown[]>(`/api/presets/${id}`)
  }
}


export class Chat {
  syncLocalChat(chats: any, messages: any) {
    return http.post<unknown[]>(`/api/chats/`, { chats, messages })
  }
  createChat() {
    return http.post<unknown[]>(`/api/chats/`)
  }
  getMessagesFromChat(id: string) {
    return http.get<unknown[]>(`/api/chats/${id}`)
  }
  renameChat(id: string, title: string) {
    return http.put<unknown[]>(`/api/chats/${id}`, { title })
  }
  deleteChat(id: string) {
    return http.delete<unknown[]>(`/api/chats/${id}`)
  }
}

