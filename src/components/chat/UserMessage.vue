<template>
  <div
    class="user-message-wrap fade-up"
    :style="{ animationDelay: `${index * 0.06}s` }"
  >
    <div class="bubble">{{ message.content }}</div>
  </div>
</template>

<script setup lang="ts">
import type { MessageType } from '@/types'
defineProps<{ message: MessageType; index: number }>()
</script>

<style scoped>
.user-message-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
}
.bubble {
  background: var(--msg-user);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px 14px 4px 14px;
  padding: 11px 16px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
