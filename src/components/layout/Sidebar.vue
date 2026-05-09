<template>
  <aside
    class="sidebar"
    :class="{ resizing: isResizing }"
    :style="{
      width: sidebarOpen ? sidebarWidth + 'px' : '0',
    }"
  >
    <div class="sidebar-inner" :style="{ width: sidebarWidth + 'px' }">
      <div class="sidebar-header">
        <button @click="ui.toggleSidebar" class="icon-btn" :title="t.sidebar.close">
          <SvgIcon iconName="openedSidebar" class="icon-btn_svg" hideStroke />
        </button>

        <div class="header-actions">
          <button class="icon-btn" :title="t.sidebar.search" @click="searchOpen = true">
            <SvgIcon iconName="search" />
          </button>
          <button class="icon-btn icon-btn--new" :title="t.sidebar.newChat" @click="createNewChat">
            <SvgIcon iconName="newChat" />
          </button>
        </div>
      </div>

      <ChatList />

      <UserProfile />
    </div>

    <div
      class="resize-handle"
      @mousedown="startResize"
    />
  </aside>

  <SearchModal v-model="searchOpen" />
  <DemoLimitModal
    v-model="demoNewChatOpen"
    :title="t.demoLimit.newChatTitle"
    :message="t.demoLimit.newChatMessage"
    @login="loginOpen = true"
  />
  <LoginModal v-model="loginOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chatStore'
import { useUiStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from '@/i18n'
import ChatList from '@/components/sidebar/ChatList.vue'
import UserProfile from '@/components/sidebar/UserProfile.vue'
import SearchModal from '@/components/sidebar/SearchModal.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import DemoLimitModal from '@/components/ui/DemoLimitModal.vue'
import LoginModal from '@/components/ui/LoginModal.vue'

const chatStore = useChatStore()
const ui = useUiStore()
const auth = useAuthStore()
const { t } = useI18n()
const { sidebarOpen } = storeToRefs(ui)

const searchOpen = ref(false)
const demoNewChatOpen = ref(false)
const loginOpen = ref(false)

function createNewChat() {
  if (auth.isGuest) {
    demoNewChatOpen.value = true
    return
  }
  chatStore.createChat()
}

const MIN_WIDTH = 180
const MAX_WIDTH = 400
const sidebarWidth = ref(230)
const isResizing = ref(false)

function startResize(e: MouseEvent) {
  e.preventDefault()
  isResizing.value = true
  const startX = e.clientX
  const startWidth = sidebarWidth.value

  function onMouseMove(ev: MouseEvent) {
    const delta = ev.clientX - startX
    sidebarWidth.value = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta))
  }

  function onMouseUp() {
    isResizing.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<style scoped>
.sidebar {
  position: relative;
  background: var(--sidebar);
  border-right: 1px solid var(--sidebar-border);
  overflow: hidden;
  flex-shrink: 0;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar.resizing {
  transition: none;
  user-select: none;
}
.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* ── Header ─────────────────────────────────────────── */
.sidebar-header {
  padding: 14px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

/* ── Icon buttons ────────────────────────────────────── */
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.14s, color 0.14s;
}
.icon-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
}
.icon-btn_svg {
  transition: fill 0.14s;
  fill: var(--text-muted);
}
.icon-btn:hover .icon-btn_svg {
  fill: var(--text);
}

.icon-btn--new {
  color: var(--accent);
  background: var(--accent-light);
}
.icon-btn--new:hover {
  background: var(--accent-mid);
  color: var(--accent);
}

/* ── Nav tabs ────────────────────────────────────────── */
.nav-tabs {
  display: flex;
  gap: 2px;
  padding: 0 8px 6px;
  flex-shrink: 0;
}
.nav-tab {
  flex: 1;
  background: none;
  border: none;
  color: var(--text-muted);
  border-radius: 7px;
  padding: 6px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.nav-tab.active {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
  font-weight: 500;
}

/* ── Resize handle ───────────────────────────────────── */
.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  z-index: 10;
}
.resize-handle:hover,
.resize-handle:active {
  background: var(--accent-mid, rgba(139, 92, 246, 0.4));
}
</style>
