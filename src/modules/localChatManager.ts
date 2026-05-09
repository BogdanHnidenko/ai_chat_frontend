import type { ChatType, MessageType } from '@/types'

const GUEST_CHATS_KEY = 'guest_chats'
const GUEST_MESSAGES_KEY = 'guest_messages'

// ── Chats ─────────────────────────────────────────────────────────────────────

export function loadGuestChats(): ChatType[] {
  try {
    const raw = localStorage.getItem(GUEST_CHATS_KEY)
    if (!raw) return []
    return (JSON.parse(raw) as any[]).map(c => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
    }))
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
  return (all[chatId] ?? []).map((m: any) => ({
    ...m,
    timestamp: new Date(m.timestamp),
  }))
}

export function updateGuestMessage(chatId: string, messageId: string, content: string): void {
  const all = loadAllGuestMessages()
  const msgs = all[chatId]
  if (!msgs) return
  const msg = msgs.find(m => m.id === messageId)
  if (!msg) return
  msg.content = content
  msg.isTyping = false
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


// ── Bulk clear ────────────────────────────────────────────────────────────────

export function clearAllGuestData(): void {
  localStorage.removeItem(GUEST_CHATS_KEY)
  localStorage.removeItem(GUEST_MESSAGES_KEY)
}
