<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/uiStore'

const ui = useUiStore()

onMounted(() => {
  document.documentElement.setAttribute('data-theme', ui.theme)
})
</script>
