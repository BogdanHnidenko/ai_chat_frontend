<template>
  <BaseModal
    :modelValue="modelValue"
    :title="title"
    width="360px"
    @update:modelValue="emit('update:modelValue', $event)"
    @cancel="emit('update:modelValue', false)"
  >
    <p class="message">{{ message }}</p>

    <template #footer>
      <button class="btn-cancel" @click="emit('update:modelValue', false)">
        {{ t.demoLimit.cancel }}
      </button>
      <button class="btn-login" @click="onLogin">
        {{ t.demoLimit.login }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useI18n } from '@/i18n'
import BaseModal from '@/components/ui/BaseModal.vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  login: []
}>()

const { t } = useI18n()

function onLogin() {
  emit('update:modelValue', false)
  emit('login')
}
</script>

<style scoped>
.message {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.btn-cancel {
  padding: 8px 16px;
  background: none;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.06);
}

.btn-login {
  padding: 8px 16px;
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
.btn-login:hover {
  opacity: 0.88;
}
</style>
