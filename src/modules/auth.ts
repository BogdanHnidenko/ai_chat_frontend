import { Auth, Chat } from '@/api/API'
import { updateToken, updateUserId } from '@/utils/cookies'
import { useAuthStore } from '@/stores/authStore'
import { loadGuestChats, loadAllGuestMessages, clearAllGuestData } from '@/modules/localChatManager'

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
        title: chat?.title,
        createdAt: chat?.createdAt
      }
    }) || []
    let messages = []
    
    const localMessages = loadAllGuestMessages() as any
    for (const key in localMessages) {
      const mes = localMessages[key]
      messages.push({
        chatId: key,
        content: mes?.title,
        createdAt: mes?.createdAt
      })
    }
    await chatApi.syncLocalChat(chats, messages)
  }

  clearAllGuestData()
  const auth = useAuthStore()
  auth.deactivationGuest()
}

export const login = async ({ email, password }: { email: string, password: string }) => {
  const { token, userId } = await authApi.login({ email, password }) as any
  if(!token || !userId) throw new Error("Error auth")
  updateCookies(token, userId)
  await syncLocalChat()
}

export const register = async ({ name, email, password }: { name: string, email: string, password: string }) => {
  const { token, userId } = await authApi.register({ name, email, password }) as any
  if(!token || !userId) throw new Error("Error auth")
  updateCookies(token, userId)
  await syncLocalChat()
}