import axios from 'axios'
import { getToken, getUserId, removeToken, removeUserId } from '@/utils/cookies'
import { API_ERRORS } from '@/helpers/apiErrors'

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
    if(response.status !== 204 && response.status !== 205) {
      if (data?.status === 'error' && data?.error === API_ERRORS.NO_AUTH) {
        handleAuthError()
        return Promise.reject(new Error(API_ERRORS.NO_AUTH))
      } else if(data?.status !== 'done') {
        return Promise.reject(new Error(data?.error ?? 'unknown_error'))
      }
    }

    return response.data?.data as any
  },
  (error) => {
    const errorRes = error?.response
    const errorResData = errorRes?.data
    if (errorResData?.status === 'error' && errorResData?.error === API_ERRORS.NO_AUTH) {
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
    return http.post<unknown[]>(`/api/chats/sync`, { chats, messages })
  }
  createChat(chat: any) {
    return http.post<unknown[]>(`/api/chats/`, chat)
  }
  renameChat(id: string, title: string) {
    return http.put<unknown[]>(`/api/chats/${id}`, { title })
  }
  generateTitle(id: string) {
    return http.post<unknown[]>(`/api/chats/${id}/title`)
  }
  deleteChat(id: string) {
    return http.delete<unknown[]>(`/api/chats/${id}`)
  }
}

export class Message {
  createMessage(chatId: string, message: string) {
    return http.post<unknown[]>(`/api/message/${chatId}`, { message })
  }
  getMessages(id: string) {
    return http.get<unknown[]>(`/api/message/${id}`)
  }
  react(chatId: string, messageId: string, like: boolean | null, dislike: boolean | null) {
    return http.patch<unknown[]>(`/api/message/${chatId}/${messageId}/react`, { like, dislike })
  }
}