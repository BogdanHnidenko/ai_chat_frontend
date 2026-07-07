<template>
  <button class="new-chat-btn" @click="$emit('click')">
    <SvgIcon iconName="newChat" :size="15" />
    {{ t.newChat }}
  </button>
</template>

<script setup lang="ts">
  import SvgIcon from '@/components/ui/SvgIcon.vue'
  import { useI18n } from '@/i18n'
  defineEmits<{ click: [] }>()
  const { t } = useI18n()
</script>

<style scoped>
  .new-chat-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 10px;
    padding: 9px 12px;
    background: var(--accent-light);
    border: 1px solid var(--accent-mid);
    border-radius: 10px;
    color: var(--accent);
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
  }
  .new-chat-btn:hover {
    background: var(--accent-mid);
  }
</style>
