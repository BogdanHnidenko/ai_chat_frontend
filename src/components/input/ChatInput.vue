<template>
  <div class="input-area">
    <DemoLimitMesage v-if="demoLimitOpen" />
    <div class="input-wrap" :class="{ disabled: demoLimitOpen }">
      <textarea
        ref="textareaRef"
        :value="inputText"
        @input="handleInput"
        @keydown="handleKeydown"
        :placeholder="t.input.placeholder"
        :disabled="demoLimitOpen"
        class="textarea"
        rows="1"
      />
      <div class="input-bottom">
        <div class="input-right">
          <SendButton
            :active="!!inputText.trim() && !demoLimitOpen"
            :streaming="chatStore.isStreaming"
            @click="chatStore.isStreaming ? stopStreaming() : send()"
          />
        </div>
      </div>
    </div>
    <p class="disclaimer">{{ t.input.disclaimer }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import { useAutoResize } from '@/composables/useAutoResize'
import { useI18n } from '@/i18n'
import { streamChatMessage, stopStreaming } from '@/api/streamingApi'
import SendButton from './SendButton.vue'
import DemoLimitMesage from './DemoLimitMesage.vue'

const DEMO_MESSAGE_LIMIT = 3

const chatStore = useChatStore()
const auth = useAuthStore()
const { t } = useI18n()
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const { resize } = useAutoResize(textareaRef)
const inputText = ref('')

const demoLimitOpen = computed(() => {
  if (!auth.isGuest) return false
  if (!chatStore.activeChat) return false
  const userMessages = chatStore.activeMessages.filter(m => m.role === 'user')
  return userMessages.length >= DEMO_MESSAGE_LIMIT
})

function handleInput(e: Event) {
  inputText.value = (e.target as HTMLTextAreaElement).value
  resize()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    if (chatStore.isStreaming) return
    send()
  }
}

async function send() {
  const message = inputText.value.trim()
  if (!message || demoLimitOpen.value) return

  inputText.value = ''
  resize()
  streamChatMessage({ message })
}
</script>

<style scoped>
.input-area {
  padding: 12px 24px 16px;
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--divider);
}
.input-wrap {
  max-width: 720px;
  margin: 0 auto;
  background: var(--input-bg);
  border: 1.5px solid var(--input-border);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  gap: 10px;
  box-shadow: var(--input-shadow);
  transition: border-color 0.15s;
}
.input-wrap:focus-within {
  border-color: var(--accent-mid);
}
.textarea {
  background: none;
  border: none;
  outline: none;
  resize: none;
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
  line-height: 1.6;
  min-height: 24px;
  max-height: 140px;
  overflow: auto;
  caret-color: var(--accent);
  width: 100%;
  align-self: center;
}
.textarea::placeholder {
  color: var(--text-dim);
}
.input-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.input-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.disclaimer {
  text-align: center;
  font-size: 11px;
  color: var(--text-dim);
  margin-top: 8px;
  margin-bottom: 0;
}
.input-wrap.disabled {
  opacity: 0.45;
  pointer-events: none;
}
</style>
