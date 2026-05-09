<template>
  <div class="message-list chat-scroll" ref="scrollEl">
    <div v-if="messages.length === 0" class="empty-state">
      <AILogo :size="30"/>
      <div class="empty-title">{{ t.messages.emptyTitle }}</div>
      <div class="empty-sub">{{ t.messages.emptySub }}</div>
    </div>

    <div v-else class="messages">
      <template v-for="(message, i) in messages" :key="message.id">
        <UserMessage v-if="message.role === 'user'" :message="message" :index="i" />
        <AIMessage v-else :message="message" :index="i" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { useI18n } from '@/i18n'
import AIMessage from './AIMessage.vue'
import UserMessage from './UserMessage.vue'
import AILogo from '@/components/ui/AILogo.vue'

const chatStore = useChatStore()
const { t } = useI18n()

const messages = computed(() => chatStore.activeMessages)

const scrollEl = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (scrollEl.value) {
      scrollEl.value.scrollTop = scrollEl.value.scrollHeight
    }
  })
}

watch(() => messages.value.length, scrollToBottom)

watch(
  () => chatStore.isStreaming,
  (streaming) => {
    if (streaming) scrollToBottom()
  }
)

watch(
  () => messages.value[messages.value.length - 1]?.content,
  () => {
    if (chatStore.isStreaming) scrollToBottom()
  }
)
</script>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
.messages {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
  color: var(--text-muted);
}
.empty-icon {
  font-size: 32px;
  color: var(--accent);
  margin-bottom: 6px;
}
.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}
.empty-sub {
  font-size: 14px;
  color: var(--text-muted);
}
</style>
