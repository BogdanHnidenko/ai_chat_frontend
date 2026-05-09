<template>
  <BaseModal v-model="isOpen" :title="title" width="360px" :closeOnBackdrop="true">
    <p class="confirm-message">{{ message }}</p>
    <template #footer>
      <button class="btn-cancel" @click="onCancel">{{ t.confirmDelete.cancel }}</button>
      <button class="btn-confirm" @click="onConfirm">{{ t.confirmDelete.confirm }}</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { useI18n } from '@/i18n'

const isOpen = defineModel<boolean>({ required: true })
const { t } = useI18n()

defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

function onConfirm() {
  isOpen.value = false
  emit('confirm')
}

function onCancel() {
  isOpen.value = false
  emit('cancel')
}
</script>

<style scoped>
.confirm-message {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.btn-cancel,
.btn-confirm {
  padding: 8px 18px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text-muted);
}
.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.11);
}

.btn-confirm {
  background: #c0392b;
  color: #fff;
}
.btn-confirm:hover {
  opacity: 0.85;
}
</style>
