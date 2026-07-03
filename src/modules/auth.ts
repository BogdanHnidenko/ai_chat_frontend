import { Auth, Chat } from '@/api/API'
import { updateToken, updateUserId } from '@/utils/cookies'
import { useAuthStore } from '@/stores/authStore'
import { loadGuestChats, loadAllGuestMessages, clearAllGuestData } from '@/modules/localChatManager'
import { API_ERRORS } from '@/helpers/apiErrors'

const authApi = new Auth
const chatApi = new Chat

const updateCookies = (token: string, userId: string) => {
  updateToken(token)
  updateUserId(userId)
}

const syncLocalChat = async () => {
  const localChats = loadGuestChats()
  if(localChats.length > 0) {
    const chats = localChats?.map((chat: any) => {
      return {
        id: chat?.id,
        title: chat?.title,
        createdAt: chat?.createdAt
      }
    }) || []
    let messages = []
    
    const localMessages = loadAllGuestMessages()
    for (const chatId in localMessages) {
      for (const msg of (localMessages[chatId] ?? [])) {
        messages.push({
          chatId,
          role: msg.role,
          content: msg.content,
          createdAt: msg.timestamp,
          like: msg.like,
          dislike: msg.dislike,
        })
      }
    }
    await chatApi.syncLocalChat(chats, messages)
  }

  clearAllGuestData()
  const auth = useAuthStore()
  auth.deactivationGuest()
}

export const login = async ({ email, password }: { email: string, password: string }) => {
  const result = await authApi.login({ email, password }).catch((e: any) => {
    const key: string = e?.response?.data?.error ?? ''
    if (key === API_ERRORS.USER_NOT_FOUND) throw new Error(API_ERRORS.USER_NOT_FOUND)
    throw new Error(API_ERRORS.INVALID_CREDENTIALS)
  }) as any

  if (!result?.token || !result?.userId) throw new Error(API_ERRORS.INVALID_CREDENTIALS)
  updateCookies(result.token, result.userId)
  await syncLocalChat()
}

export const register = async ({ name, email, password }: { name: string, email: string, password: string }) => {
  const { token, userId } = await authApi.register({ name, email, password }) as any
  if(!token || !userId) throw new Error("Error auth")
  updateCookies(token, userId)
  await syncLocalChat()
}