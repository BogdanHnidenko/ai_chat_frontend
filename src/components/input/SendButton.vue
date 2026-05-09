<template>
  <button
    class="send-btn"
    :class="{ active: active || streaming, streaming }"
    :disabled="!active && !streaming"
    @click="$emit('click')"
    :title="streaming ? t.input.stop : t.input.send"
  >
    <Transition name="btn-icon" mode="out-in">
      <SvgIcon v-if="streaming" key="stop" iconName="stop" :size="13" />
      <SvgIcon v-else key="send" iconName="send" :size="15" strokeWidth="2.5" />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useI18n } from '@/i18n'
defineProps<{ active: boolean; streaming: boolean }>()
defineEmits<{ click: any }>()
const { t } = useI18n()
</script>

<style scoped>
.send-btn {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.07);
  color: var(--text-dim);
  transition: all 0.15s;
  flex-shrink: 0;
}
.send-btn.active {
  background: var(--accent);
  color: white;
}
.send-btn.streaming {
  background: var(--accent);
  color: white;
}
.send-btn.active:hover,
.send-btn.streaming:hover {
  opacity: 0.88;
}
.send-btn:disabled {
  cursor: default;
}

.btn-icon-enter-active,
.btn-icon-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}
.btn-icon-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.btn-icon-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
</style>
