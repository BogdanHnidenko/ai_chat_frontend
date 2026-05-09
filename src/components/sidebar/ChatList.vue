<template>
  <div class="chat-list">
    <template v-if="Object.keys(filteredGroups).length">
      <div v-for="(chats, group) in filteredGroups" :key="group">
        <div class="group-label">{{ group }}</div>
        <ChatItem
          v-for="chat in chats"
          :key="chat.id"
          :chat="chat"
          :active="chat.id === activeChatId"
          @click="chatStore.setActiveChat(chat.id)"
        />
      </div>
    </template>

    <div v-else class="empty-state">
      {{ t.chatList.empty }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chatStore'
import { useI18n } from '@/i18n'
import ChatItem from './ChatItem.vue'

const chatStore = useChatStore()
const { t } = useI18n()
const { groupedChats } = storeToRefs(chatStore)

const activeChatId = computed(() => chatStore.activeChatId)

const filteredGroups = computed(() => groupedChats.value)
</script>

<style scoped>
.chat-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px 8px;
  display: flex;
  flex-direction: column;
}
.group-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-dim);
  padding: 10px 8px 4px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  color: var(--text-dim);
}
</style>
