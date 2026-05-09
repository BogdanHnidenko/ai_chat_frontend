<template>
  <img src="/logo.webp" alt="logo" :width="size" :height="size" />
</template>

<script setup lang="ts">
defineProps<{ size?: number }>()
</script>
