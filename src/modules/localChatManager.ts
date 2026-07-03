import type { ChatType, MessageType } from '@/types'

const GUEST_CHATS_KEY = 'guest_chats'
const GUEST_MESSAGES_KEY = 'guest_messages'
const GUEST_HAD_CHAT_KEY = 'guest_had_chat'

export function markGuestHadChat(): void {
  localStorage.setItem(GUEST_HAD_CHAT_KEY, '1')
}

export function guestHadChat(): boolean {
  return localStorage.getItem(GUEST_HAD_CHAT_KEY) === '1'
}

export function clearGuestHadChat(): void {
  localStorage.removeItem(GUEST_HAD_CHAT_KEY)
}

// ── Chats ─────────────────────────────────────────────────────────────────────

export function loadGuestChats(): ChatType[] {
  try {
    const raw = localStorage.getItem(GUEST_CHATS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveGuestChats(chats: ChatType[]): void {
  localStorage.setItem(GUEST_CHATS_KEY, JSON.stringify(chats))
}

export function upsertGuestChat(chat: ChatType): void {
  const chats = loadGuestChats()
  chats.push(chat)
  saveGuestChats(chats)
  markGuestHadChat()
}

// ── Messages ──────────────────────────────────────────────────────────────────

export function loadAllGuestMessages(): Record<string, MessageType[]> {
  try {
    const raw = localStorage.getItem(GUEST_MESSAGES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAllGuestMessages(messages: Record<string, MessageType[]>): void {
  localStorage.setItem(GUEST_MESSAGES_KEY, JSON.stringify(messages))
}

export function loadGuestMessages(chatId: string): MessageType[] {
  const all = loadAllGuestMessages()
  return all[chatId] ?? []
}

export function updateGuestMessage(chatId: string, messageId: string, content: string, like: boolean | null = null, dislike: boolean | null = null): void {
  const all = loadAllGuestMessages()
  const msgs = all[chatId]
  if (!msgs) return
  const msg = msgs.find(m => m.id === messageId)
  if (!msg) return
  msg.content = content
  msg.isTyping = false
  if (like !== null) msg.like = like
  if (dislike !== null) msg.dislike = dislike
  saveAllGuestMessages(all)

  const chats = loadGuestChats()
  const chat = chats.find(c => c.id === chatId)
  if (chat) {
    chat.updatedAt = msg.timestamp
    saveGuestChats(chats)
  }
}

export function appendGuestMessage(chatId: string, message: MessageType): void {
  const all = loadAllGuestMessages()
  const msgs = all[chatId] ?? []
  msgs.push(message)
  all[chatId] = msgs
  saveAllGuestMessages(all)

  // Keep chat.updatedAt in sync
  const chats = loadGuestChats()
  const chat = chats.find(c => c.id === chatId)
  if (chat) {
    chat.updatedAt = message.timestamp
    saveGuestChats(chats)
  }
}


export function updateGuestChatTitle(chatId: string, title: string): void {
  const chats = loadGuestChats()
  const chat = chats.find(c => c.id === chatId)
  if (!chat) return
  chat.title = title
  saveGuestChats(chats)
}

export function deleteGuestChat(chatId: string): void {
  const chats = loadGuestChats().filter(c => c.id !== chatId)
  saveGuestChats(chats)

  const all = loadAllGuestMessages()
  delete all[chatId]
  saveAllGuestMessages(all)
}

// ── Bulk clear ────────────────────────────────────────────────────────────────

export function clearAllGuestData(): void {
  localStorage.removeItem(GUEST_CHATS_KEY)
  localStorage.removeItem(GUEST_MESSAGES_KEY)
  clearGuestHadChat()
}
