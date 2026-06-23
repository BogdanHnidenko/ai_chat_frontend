import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import { usePresetStore } from '@/stores/presetStore'
import router from '@/router'
import { GetStart } from '@/api/API'
import { guestHadChat } from '@/modules/localChatManager'

const api = new GetStart

const setCurrentData = (auth: any, chatStore: any, presetStore: any, data: any = {}) => {
  const { user, chats, presets } = data
  if (!user) throw new Error("Doesn't available user")
  if (!chats) throw new Error("Doesn't available chats")

  auth.setUser(user)
  presetStore.setPresets(presets ?? [])

  if (chats.length === 0) {
    chatStore.createChat()
  } else {
    chatStore.chats = chats.map((c: any) => ({
      id: c.id,
      title: c.title,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }))
  }
}

export default async () => {
  const chatStore = useChatStore()
  const auth = useAuthStore()
  const presetStore = usePresetStore()

  if (auth.isGuest) {
    auth.loginAsGuest()
    chatStore.loadGuestChatsIntoStore()
    if (chatStore.chats.length === 0 && !guestHadChat()) chatStore.createChat()
    router.replace('/chats')
    return
  }

  try {
    const response = await api.getStart() as any
    setCurrentData(auth, chatStore, presetStore, response)
    router.replace('/chats')
  } catch (error) {
    if (!auth.isLoggedIn) return
    auth.logout()
    router.replace('/welcome')
  }
}
