<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="chat-menu-overlay"
      @mousedown.self="close"
      @touchstart.self="close"
    />
    <Transition name="menu">
      <div
        v-if="visible"
        class="chat-menu"
        :style="menuStyle"
        @mousedown.stop
      >

        <button class="menu-item" @click="emit('rename')">
          <SvgIcon iconName="rename" :size="14" />
          {{ t.chatMenu.rename }}
        </button>

        <div class="menu-divider" />

        <button class="menu-item danger" @click="emit('delete')">
          <SvgIcon iconName="trash" :size="14" />
          {{ t.chatMenu.delete }}
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const props = defineProps<{
  visible: boolean
  x: number
  y: number
}>()

const emit = defineEmits<{
  close: []
  pin: []
  rename: []
  delete: []
}>()

const MENU_WIDTH = 200
const MENU_HEIGHT = 130

const menuStyle = computed(() => {
  const x = Math.min(props.x, window.innerWidth - MENU_WIDTH - 8)
  const y = Math.min(props.y, window.innerHeight - MENU_HEIGHT - 8)
  return { left: `${x}px`, top: `${y}px` }
})

function close() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.chat-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}

.chat-menu {
  position: fixed;
  z-index: 1000;
  background: var(--bg-secondary, #1e1e1e);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 4px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 8px 10px;
  background: none;
  border: none;
  border-radius: 7px;
  color: var(--text-muted, #aaa);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s, color 0.1s;
}
.menu-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text, #fff);
}
.menu-item.danger {
  color: #e05555;
}
.menu-item.danger:hover {
  background: rgba(224, 85, 85, 0.12);
  color: #ff6b6b;
}

.menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  margin: 3px 4px;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.12s, transform 0.12s;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
