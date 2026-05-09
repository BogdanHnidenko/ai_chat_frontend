<template>
  <button class="icon-btn" :title="title" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
defineEmits<{ click: [] }>()
</script>

<style scoped>
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  border-radius: 7px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s, color 0.12s;
}
.icon-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
}
</style>
