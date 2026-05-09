<template>
  <div
    class="chat-item-wrap"
    :class="{ active }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @contextmenu.prevent="openMenuAt($event.clientX, $event.clientY)"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchmove="onTouchMove"
  >
    <button
      class="chat-item"
      :class="{ active }"
      @click="$emit('click')"
    >
      <span class="chat-title">{{ chat.title }}</span>
    </button>
    <button
      v-show="hovered || menuVisible"
      class="more-btn"
      :class="{ active: menuVisible }"
      @click.stop="openMenuAt($event.clientX, $event.clientY)"
      title="Дії"
    >
      <SvgIcon iconName="dotsHorizontal" :size="14" />
    </button>

    <ChatMenu
      :visible="menuVisible"
      :x="menuX"
      :y="menuY"
      @close="closeMenu"
      @rename="onRename"
      @delete="onDelete"
    />

    <RenameModal
      v-model="renaming"
      :initialValue="chat.title"
      @confirm="submitRename"
    />

    <LoginModal v-model="loginOpen" />

    <ConfirmModal
      v-model="confirmDeleteOpen"
      :title="t.confirmDelete.chatTitle"
      :message="t.confirmDelete.chatMessage"
      @confirm="confirmDelete"
    />

    <BaseModal
      v-model="ui.showChatDeletedModal"
      :title="t.chatDeleted.title"
      width="340px"
    >
      <p class="deleted-msg">{{ t.chatDeleted.message }}</p>
      <template #footer>
        <button class="btn-ok" @click="ui.showChatDeletedModal = false">{{ t.chatDeleted.ok }}</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ChatType } from '@/types'
import ChatMenu from '@/components/ui/ChatMenu.vue'
import RenameModal from '@/components/ui/RenameModal.vue'
import LoginModal from '@/components/ui/LoginModal.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { useI18n } from '@/i18n'

const props = defineProps<{ chat: ChatType; active: boolean }>()
const emit = defineEmits<{
  click: []
}>()

const chatStore = useChatStore()
const auth = useAuthStore()
const ui = useUiStore()
const { t } = useI18n()
const hovered = ref(false)
const menuVisible = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const renaming = ref(false)
const loginOpen = ref(false)
const confirmDeleteOpen = ref(false)

function openMenuAt(x: number, y: number) {
  menuX.value = x
  menuY.value = y
  menuVisible.value = true
}

function closeMenu() {
  menuVisible.value = false
}

function onRename() {
  closeMenu()
  renaming.value = true
}

function submitRename(name: string) {
  chatStore.renameChat(props.chat.id, name)
}

function onDelete() {
  closeMenu()
  if (auth.isGuest) {
    loginOpen.value = true
    return
  }
  confirmDeleteOpen.value = true
}

function confirmDelete() {
  chatStore.deleteChat(props.chat.id)
}

let longPressTimer: ReturnType<typeof setTimeout> | null = null
let touchMoved = false

function onTouchStart(e: TouchEvent) {
  touchMoved = false
  longPressTimer = setTimeout(() => {
    if (!touchMoved) {
      const t = e.touches[0]!
      openMenuAt(t.clientX, t.clientY)
    }
  }, 500)
}

function onTouchEnd() {
  if (longPressTimer) clearTimeout(longPressTimer)
}

function onTouchMove() {
  touchMoved = true
  if (longPressTimer) clearTimeout(longPressTimer)
}
</script>

<style scoped>
.chat-item-wrap {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  text-align: left;
  background: none;
  border: 1px solid transparent;
  border-radius: 9px;
  padding: 9px 10px;
  padding-right: 30px;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 13px;
  font-family: inherit;
  line-height: 1.35;
  transition: all 0.12s;
}
.chat-item:hover {
  background: rgba(255, 255, 255, 0.04);
}
.chat-item.active {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text);
}
.chat-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dot {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.pin-icon {
  flex-shrink: 0;
  color: var(--accent, #7c6af7);
  opacity: 0.8;
}

.more-btn {
  position: absolute;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
  flex-shrink: 0;
}
.more-btn:hover,
.more-btn.active {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
}

.deleted-msg {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.btn-ok {
  padding: 8px 20px;
  background: var(--accent);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn-ok:hover {
  opacity: 0.88;
}
</style>
