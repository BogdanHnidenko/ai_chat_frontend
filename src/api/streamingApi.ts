import { useAuthStore } from '@/stores/authStore'
import { useChatStore } from '@/stores/chatStore'
import { useI18n } from '@/i18n'
import type { MessageType } from '@/types'
import { Chat, Message } from '@/api/API'
const apiChat = new Chat
const apiMessage = new Message

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'


// ── AbortController for stream cancellation ────────────────────────────────

let _abortController: AbortController | null = null

export function stopStreaming(): void {
  _abortController?.abort()
  _abortController = null
}

// ── Core SSE fetch — yields text chunks ───────────────────────────────────

interface FetchStreamOptions {
  chatId: string
  message: string
  signal: AbortSignal
}

async function *fetchStream({ chatId, message, signal }: FetchStreamOptions): AsyncGenerator<string> {
  const auth = useAuthStore()
  const url = `${BASE_URL}/api/message/${chatId}/stream`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify({ isDemo: auth.isGuest, message }),
    signal,
  })

  if (!response.ok || !response.body) {
    throw new Error(`Stream unavailable (${response.status})`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunkRText = decoder.decode(value, { stream: true })
    const lines = chunkRText.split('\n')

    for (const line of lines) {
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') return
      try {
        const parsed = JSON.parse(data)
        // Title update event from server after first message
        if (parsed && typeof parsed === 'object' && parsed.__type === 'title') {
          const chatStore = useChatStore()
          const chat = chatStore.chats.find(c => c.id === chatId)
          if (chat) chat.title = parsed.title
          continue
        }
        if (parsed) yield parsed
      } catch {
        if (data) yield data
      }
    }
  }
}

const createNewChatAndMessage = async (message: string) => {
  const chatStore = useChatStore()
  const auth = useAuthStore()
  const { t } = useI18n()

  let chatId: string = chatStore?.activeChatId || ""
  if (!chatId) throw new Error("No active chat")

  const pendingChat = chatStore.pendingChat
  let sendChunk = false

  if (pendingChat?.id === chatId) {
    if (auth.isGuest) {
      chatStore.createChatFromPending(pendingChat)
      sendChunk = true
    } else {
      try {
        const chat = await apiChat.createChat(pendingChat) as any
        chatStore.createChatFromPending(chat)
        chatId = chat?.id || ""
        sendChunk = true
      } catch {
        chatStore.createChatFromPending(pendingChat)
        sendChunk = false
      }
    }
  }

  let messages: MessageType[] = []
  try {
    if (auth.isGuest) {
      messages = [
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        },
        {
          id: crypto.randomUUID(),
          role: 'ai',
          content: '',
          timestamp: new Date().toISOString(),
          isTyping: true,
          like: false,
          dislike: false,
        }
      ]
      sendChunk = true
    } else {
      messages = await apiMessage.createMessage(chatId, message) as unknown as MessageType[]
      sendChunk = true
    }
  } catch {
    messages = [
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        role: 'ai',
        content: t.value.input.demoReply,
        timestamp: new Date().toISOString(),
        isTyping: false,
        like: false,
        dislike: false,
      }
    ]
    sendChunk = false
  }

  messages.forEach(m => chatStore.addMessage(chatId, m))
  const aiMessage = messages.find(m => m.role === 'ai')
  const aiMessageId = aiMessage?.id || ""

  return { chatId, aiMessageId, sendChunk }
}

// ── Public API ─────────────────────────────────────────────────────────────

export interface StreamOptions {
  message: string
}

export async function streamChatMessage({ message }: StreamOptions): Promise<void> {
  const chatStore = useChatStore()
  const { t } = useI18n()

  const { chatId, aiMessageId, sendChunk } = await createNewChatAndMessage(message)

  if (!sendChunk) return

  _abortController = new AbortController()
  chatStore.setStreaming(true)

  try {
    for await (const chunk of fetchStream({ chatId, message, signal: _abortController.signal })) {
      const msg = chatStore.activeMessages.find(m => m.id === aiMessageId)
      if (msg) msg.isTyping = false
      chatStore.appendStreamChunk(chatId, aiMessageId, chunk)
    }
  } catch (err) {
    const isAbort = err instanceof Error && err.name === 'AbortError'
    const aiMsg = chatStore.activeMessages.find(m => m.id === aiMessageId)
    if (!aiMsg) return

    aiMsg.isTyping = false

    if (!isAbort && !aiMsg.content) {
      chatStore.appendStreamChunk(chatId, aiMessageId, t.value.input.demoReply)
    }
  } finally {
    chatStore.setStreaming(false)
    _abortController = null
  }
}
