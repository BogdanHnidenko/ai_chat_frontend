import { useAuthStore } from '@/stores/authStore'
import { useChatStore } from '@/stores/chatStore'
import { useI18n } from '@/i18n'
import type { MessageType } from '@/types'

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

async function *fetchStream(opts: FetchStreamOptions): AsyncGenerator<string> {
  const auth = useAuthStore()
  const currentSection = auth.isGuest ? "createDemoMessage" : "createMessage"
  const url = `${BASE_URL}/api/message?section=${currentSection}&chatId=${opts.chatId}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify({ message: opts.message }),
    signal: opts.signal,
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
    const buffer = chunkRText
    const lines = buffer.split('\n')

    for (const line of lines) {
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') return
      try {
        const parsed = JSON.parse(data) as string
        if (parsed) yield parsed
      } catch {
        if (data) yield data
      }
    }
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

export interface StreamOptions {
  message: string
}

export async function streamChatMessage(opts: StreamOptions): Promise<void> {
  const chatStore = useChatStore()
  const auth = useAuthStore()
  const { t } = useI18n()

  const chatId = chatStore.activeChatId
  if (!chatId) return

  const text = opts.message

  const userMessage: MessageType = {
    id: crypto.randomUUID(),
    role: 'user',
    content: text,
    timestamp: new Date(),
  }
  chatStore.addMessage(chatId, userMessage)

  const aiMessageId = crypto.randomUUID()
  chatStore.addMessage(chatId, {
    id: aiMessageId,
    role: 'ai',
    content: '',
    timestamp: new Date(),
    isTyping: true,
  })

  _abortController = new AbortController()
  chatStore.setStreaming(true)

  let streamFailed = false
  let isAbort = false

  try {
    for await (const chunk of fetchStream({ chatId, message: text, signal: _abortController.signal })) {
      const msg = chatStore.activeMessages.find(m => m.id === aiMessageId)
      if (msg) msg.isTyping = false
      chatStore.appendStreamChunk(chatId, aiMessageId, chunk)
    }
  } catch (err) {
    isAbort = err instanceof Error && err.name === 'AbortError'
    streamFailed = !isAbort
  } finally {
    const aiMsg = chatStore.activeMessages.find(m => m.id === aiMessageId)

    if (!aiMsg) {
      // Message was never added — add fallback
      const fallback: MessageType = {
        id: crypto.randomUUID(),
        role: 'ai',
        content: t.value.input.demoReply,
        timestamp: new Date(),
      }
      chatStore.addMessage(chatId, fallback)
    } else {
      aiMsg.isTyping = false

      if (streamFailed && !aiMsg.content) {
        // Stream errored before any content arrived — write fallback into existing bubble
        chatStore.appendStreamChunk(chatId, aiMessageId, t.value.input.demoReply)
      }
    }

    chatStore.setStreaming(false)
    _abortController = null
  }
}
