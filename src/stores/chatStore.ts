import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import type { ChatType, MessageType } from '@/types'
import { Chat, Message } from '@/api/API'
import { useI18n } from '@/i18n'
import {
  loadGuestChats,
  loadGuestMessages,
  upsertGuestChat,
  appendGuestMessage,
  updateGuestMessage,
  deleteGuestChat
} from '@/modules/localChatManager'

const api = new Chat
const messageApi = new Message

function getChatLabels() {
  const { t } = useI18n()
  return t.value.chatList
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [] as ChatType[],
    messages: new Map<string, MessageType[]>(),
    activeChatId: null as string | null,
    pendingChat: null as ChatType | null,
    isStreaming: false,
    isLoadingMessages: false,
  }),

  getters: {
    activeChat: (state): ChatType | null => {
      if (state.pendingChat && state.pendingChat.id === state.activeChatId) {
        return state.pendingChat
      }
      return state.chats.find(c => c.id === state.activeChatId) ?? null
    },

    activeMessages(): MessageType[] {
      if (!this.activeChatId) return []
      return this.messages.get(this.activeChatId) ?? []
    },

    groupedChats: (state): Record<string, ChatType[]> => {
      const now = Date.now()
      const DAY = 86400000
      const groups: Record<string, ChatType[]> = {}
      const labels = getChatLabels()

      for (const chat of state.chats) {
        const diff = now - new Date(chat.updatedAt).getTime()
        let label: string
        if (diff < DAY) label = labels.today
        else if (diff < DAY * 2) label = labels.yesterday
        else if (diff < DAY * 7) label = labels.daysAgo(Math.floor(diff / DAY))
        else label = labels.lastWeek

        if (!groups[label]) groups[label] = []
        ;(groups[label] as ChatType[]).push(chat)
      }

      return groups
    },
  },

  actions: {
    async setActiveChat(id: string, isGuest = false) {
      if (this.activeChatId === id) return
      if (this.isStreaming) return
      this.activeChatId = id

      this.chats.forEach(c => {
        if (c.id !== id) {
          this.messages.delete(c.id)
        }
      })

      if (this.pendingChat?.id === id) return

      const chat = this.chats.find(c => c.id === id)

      if (!chat) return

      await this.loadMessages(id, isGuest)
    },

    async loadMessages(chatId: string, isGuest = false) {
      const chat = this.chats.find(c => c.id === chatId)
      if (!chat) return

      if (isGuest) {
        this.messages.set(chatId, loadGuestMessages(chatId))
        return
      }

      this.isLoadingMessages = true
      try {
        const msgs = await messageApi.getMessages(chatId) as unknown as MessageType[]
        this.messages.set(chatId, msgs)
      } finally {
        this.isLoadingMessages = false
      }
    },

    loadGuestChatsIntoStore() {
      const guestChats = loadGuestChats()
      guestChats.forEach((chat: ChatType) => this.chats.push(chat))
    },

    createChat() {
      if (this.pendingChat) {
        this.activeChatId = this.pendingChat.id
        return
      }

      const activeChat = this.chats.find(c => c.id === this.activeChatId)
      if (activeChat) return

      const chat: ChatType = {
        id: crypto.randomUUID(),
        title: getChatLabels().newChatTitle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.messages.set(chat.id, [])
      this.pendingChat = chat
      this.activeChatId = chat.id
    },

    createChatFromPending(chat: ChatType) {
      this.chats.unshift(chat)
      this.activeChatId = chat.id
      if (useAuthStore().isGuest && this.pendingChat) upsertGuestChat(this.pendingChat)
      this.pendingChat = null
    },

    async addMessage(chatId: string, message: MessageType) {
      const chat = this.chats.find(c => c.id === chatId)
      if (!chat) return
      if(useAuthStore().isGuest) appendGuestMessage(chatId, message)

      const msgs = this.messages.get(chatId) ?? []
      msgs.push(message)
      this.messages.set(chatId, msgs)
      chat.updatedAt = new Date().toISOString()
    },

    appendStreamChunk(chatId: string, messageId: string, chunk: string) {
      const chat = this.chats.find(c => c.id === chatId)
      if (!chat) return
      const msgs = this.messages.get(chatId)
      if (!msgs) return
      const msg = msgs.find(m => m.id === messageId)
      if (!msg) return
      msg.content += chunk
      chat.updatedAt = new Date().toISOString()

      if(useAuthStore().isGuest) {
        updateGuestMessage(chatId, msg.id, msg.content)
      }
    },

    setStreaming(val: boolean) {
      this.isStreaming = val
    },

    async deleteChat(chatId: string) {
      if (this.pendingChat?.id === chatId) {
        this.pendingChat = null
        this.messages.delete(chatId)
        this.activeChatId = this.chats.length > 0 ? this.chats[0]!.id : null
        return
      }

      if (useAuthStore().isGuest) {
        deleteGuestChat(chatId)
      } else {
        await api.deleteChat(chatId)
      }

      if (this.activeChatId === chatId) {
        const idx = this.chats.findIndex(c => c.id === chatId)
        const next = this.chats[idx - 1] ?? this.chats[idx + 1] ?? null
        this.activeChatId = next?.id ?? null
        if (next) await this.loadMessages(next.id, useAuthStore().isGuest)
      }

      const idx = this.chats.findIndex(c => c.id === chatId)
      if (idx !== -1) this.chats.splice(idx, 1)
      this.messages.delete(chatId)
    },

    async reactToMessage(chatId: string, messageId: string, reaction: 'like' | 'dislike') {
      const msgs = this.messages.get(chatId)
      if (!msgs) return
      const msg = msgs.find(m => m.id === messageId)
      if (!msg) return

      const wasActive = msg[reaction]
      msg.like = false
      msg.dislike = false
      if (!wasActive) msg[reaction] = true

      if (!useAuthStore().isGuest) {
        await messageApi.react(chatId, messageId, msg.like ?? null, msg.dislike ?? null)
      } else {
        updateGuestMessage(chatId, messageId, msg.content, msg.like, msg.dislike)
      }
    },

    async renameChat(chatId: string, title: string) {
      if (useAuthStore().isGuest) return
      const trimTitle = title.trim()
      if (!trimTitle) return
      const { id, isActive } = await api.renameChat(chatId, trimTitle) as any
      if (!isActive) {
        useUiStore().showChatDeletedModal = true
        const idx = this.chats.findIndex(c => c.id === (id || chatId))
        if (idx !== -1) this.chats.splice(idx, 1)
        return
      }
      const chat = this.chats.find(c => c.id === id)
      if (!chat) return
      chat.title = trimTitle
    },
  },
})
