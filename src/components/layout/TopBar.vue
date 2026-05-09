<template>
  <header class="topbar">
    <div class="topbar-left">
      <button v-if="!sidebarOpen" @click="ui.toggleSidebar" class="sidebar-toggle" :title="t.topbar.openSidebar">
        <SvgIcon iconName="closedSidebar" class="sidebar-toggle_svg" />
      </button>
      <span class="chat-title">{{ title }}</span>
    </div>
    <div class="topbar-right">
      <button
        v-if="activeChat && !isPending"
        ref="moreBtn"
        class="action-btn"
        :class="{ active: menuVisible }"
        :title="t.topbar.chatActions"
        @click="toggleMenu"
      >
        <SvgIcon iconName="dotsHorizontal" :size="15" />
      </button>
      <!-- <button class="action-btn" title="Поділитися">
        <SvgIcon iconName="share" :size="15" />
      </button> -->
    </div>

    <ChatMenu
      v-if="activeChat && !isPending"
      :visible="menuVisible"
      :x="menuX"
      :y="menuY"
      @close="menuVisible = false"
      @rename="onRename"
      @delete="onDelete"
    />

    <RenameModal
      v-model="renaming"
      :initialValue="renameValue"
      @confirm="submitRename"
      @cancel="cancelRename"
    />

    <LoginModal v-model="loginOpen" />

    <ConfirmModal
      v-model="confirmDeleteOpen"
      :title="t.confirmDelete.chatTitle"
      :message="t.confirmDelete.chatMessage"
      @confirm="confirmDelete"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chatStore'
import { useUiStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from '@/i18n'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import ChatMenu from '@/components/ui/ChatMenu.vue'
import RenameModal from '@/components/ui/RenameModal.vue'
import LoginModal from '@/components/ui/LoginModal.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'

const chatStore = useChatStore()
const ui = useUiStore()
const auth = useAuthStore()
const { t } = useI18n()
const { activeChat, pendingChat } = storeToRefs(chatStore)
const { sidebarOpen } = storeToRefs(ui)

const loginOpen = ref(false)
const confirmDeleteOpen = ref(false)

const title = computed(() => activeChat.value?.title ?? 'Aether')
const isPending = computed(() => !!pendingChat.value && pendingChat.value.id === activeChat.value?.id)

const menuVisible = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const moreBtn = ref<HTMLButtonElement | null>(null)

const renaming = ref(false)
const renameValue = ref('')

function toggleMenu() {
  if (menuVisible.value) {
    menuVisible.value = false
    return
  }
  const rect = moreBtn.value?.getBoundingClientRect()
  if (rect) {
    menuX.value = rect.right - 200
    menuY.value = rect.bottom + 4
  }
  menuVisible.value = true
}

function onRename() {
  menuVisible.value = false
  if (!activeChat.value) return
  renameValue.value = activeChat.value.title
  renaming.value = true
}

function submitRename(name: string) {
  if (activeChat.value) chatStore.renameChat(activeChat.value.id, name)
  renaming.value = false
}

function cancelRename() {
  renaming.value = false
}

function onDelete() {
  menuVisible.value = false
  if (auth.isGuest) {
    loginOpen.value = true
    return
  }
  confirmDeleteOpen.value = true
}

function confirmDelete() {
  if (activeChat.value) chatStore.deleteChat(activeChat.value.id)
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid var(--divider);
  background: var(--bg);
  min-height: 52px;
}
.topbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 5px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  transition: background 0.12s, color 0.12s;
}
.sidebar-toggle_svg {
  stroke-width: 2;
  stroke: var(--text-muted);
}
.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
}
.chat-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
.topbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 6px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  transition: background 0.12s, color 0.12s;
}
.action-btn:hover,
.action-btn.active {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
}
</style>
