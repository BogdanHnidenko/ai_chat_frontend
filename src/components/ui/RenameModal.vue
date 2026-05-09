<template>
  <BaseModal
    v-model="open"
    :title="t.renameModal.title"
    width="360px"
    @cancel="cancel"
  >
    <div class="rename-field">
      <label class="rename-label">{{ t.renameModal.label }}</label>
      <input
        ref="inputRef"
        v-model="value"
        class="rename-input"
        :placeholder="t.renameModal.placeholder"
        maxlength="100"
        @keydown.enter="confirm"
        @keydown.escape="cancel"
      />
    </div>

    <template #footer>
      <button class="btn btn-ghost" @click="cancel">{{ t.renameModal.cancel }}</button>
      <button class="btn btn-primary" :disabled="!value.trim()" @click="confirm">{{ t.renameModal.save }}</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useI18n } from '@/i18n'

const props = defineProps<{
  modelValue: boolean
  initialValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [name: string]
  cancel: []
}>()

const { t } = useI18n()
const open = ref(props.modelValue)
const value = ref(props.initialValue ?? '')
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.modelValue, async (v) => {
  open.value = v
  if (v) {
    value.value = props.initialValue ?? ''
    await nextTick()
    inputRef.value?.focus()
    inputRef.value?.select()
  }
})

watch(open, (v) => {
  if (!v) emit('update:modelValue', false)
})

function confirm() {
  if (!value.value.trim()) return
  emit('confirm', value.value.trim())
  open.value = false
}

function cancel() {
  emit('cancel')
  open.value = false
}
</script>

<style scoped>
.rename-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rename-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.rename-input {
  width: 100%;
  background: var(--input-bg, #1d1c28);
  border: 1px solid var(--input-border, rgba(255, 255, 255, 0.08));
  border-radius: 8px;
  padding: 9px 12px;
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}
.rename-input:focus {
  border-color: var(--accent);
}

.btn {
  height: 34px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border: none;
  transition: background 0.12s, opacity 0.12s;
}
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-ghost {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.btn-ghost:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}
.btn-primary:hover:not(:disabled) {
  opacity: 0.88;
}
</style>
