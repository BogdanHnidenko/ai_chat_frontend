<template>
  <MessageList />
  <ChatInput />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import MessageList from '@/components/chat/MessageList.vue'
import ChatInput from '@/components/input/ChatInput.vue'

const chatStore = useChatStore()
const auth = useAuthStore()

onMounted(() => {
  if (!chatStore.activeChatId && chatStore.chats.length > 0) {
    chatStore.setActiveChat(chatStore.chats[0]!.id, auth.isGuest)
  }
})
</script>
