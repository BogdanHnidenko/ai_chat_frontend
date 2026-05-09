<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-backdrop" @mousedown.self="onBackdropClick">
        <div
          class="modal-box"
          :style="{ maxWidth: width }"
          role="dialog"
          aria-modal="true"
        >
          <div v-if="title" class="modal-header">
            <span class="modal-title">{{ title }}</span>
            <button class="modal-close" @click="emit('update:modelValue', false)" :title="t.modal.close">
              <SvgIcon iconName="close" :size="14" />
            </button>
          </div>

          <div class="modal-body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  width?: string
  closeOnBackdrop?: boolean
}>(), {
  width: '400px',
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

function onBackdropClick() {
  if (props.closeOnBackdrop) {
    emit('update:modelValue', false)
    emit('cancel')
  }
}

function onKeydown(e: KeyboardEvent) {
  if (!props.modelValue) return
  if (e.key === 'Escape') {
    emit('update:modelValue', false)
    emit('cancel')
  }
}

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal-box {
  background: var(--surface, #161520);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
  width: 100%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.modal-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: none;
  border: none;
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
  flex-shrink: 0;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.modal-body {
  padding: 18px;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 18px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.18s ease;
}
.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
