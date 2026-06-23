<template>
  <div
    class="ai-message fade-up"
    :style="{
      animationDelay: `${index * 0.06}s`,
      alignItems: message.isTyping ? 'center' : 'flex-start'
    }"
  >
    <AILogo :size="30" />
    <div class="ai-content">
      <TypingIndicator v-if="message.isTyping" />
      <div v-else>
        <div class="markdown" v-html="html" />
        <MessageReactions :message="message" :chatId="chatStore.activeChatId!" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MessageType } from '@/types'
import AILogo from '@/components/ui/AILogo.vue'
import TypingIndicator from './TypingIndicator.vue'
import MessageReactions from './MessageReactions.vue'
import { useMarkdown } from '@/composables/useMarkdown'
import { useChatStore } from '@/stores/chatStore'

const props = defineProps<{ message: MessageType; index: number }>()
const chatStore = useChatStore()
const { render } = useMarkdown()

const html = computed(() => render(props.message.content))
</script>

<style scoped>
.ai-message {
  display: flex;
  gap: 12px;
  padding: 6px 0;
}
.ai-content {
  flex: 1;
  min-width: 0;
  font-size: 14px;
}
.markdown {
  line-height: 1.7;
  color: var(--text);
}
.markdown :deep(strong) {
  font-weight: 600;
}
.markdown :deep(code) {
  font-family: 'DM Mono', monospace;
  font-size: 0.88em;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--code-bg);
}
.markdown :deep(pre) {
  background: var(--code-bg);
  border-radius: 8px;
  padding: 14px 16px;
  overflow-x: auto;
  margin: 10px 0;
}
.markdown :deep(pre code) {
  background: none;
  padding: 0;
}
.markdown :deep(blockquote) {
  border-left: 3px solid var(--accent);
  padding-left: 14px;
  margin: 10px 0;
  opacity: 0.85;
  font-style: italic;
}
.markdown :deep(ul),
.markdown :deep(ol) {
  padding-left: 20px;
  margin: 6px 0;
}
.markdown :deep(li) {
  margin-bottom: 4px;
}
.markdown :deep(p) {
  margin-bottom: 6px;
}
.markdown :deep(h1),
.markdown :deep(h2),
.markdown :deep(h3) {
  font-weight: 600;
  margin: 12px 0 6px;
  line-height: 1.3;
}
.markdown :deep(h1) { font-size: 1.2em; }
.markdown :deep(h2) { font-size: 1.1em; }
.markdown :deep(h3) { font-size: 1em; }
</style>
