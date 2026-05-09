<template>
  <div class="layout">
    <Sidebar />
    <div class="main">
      <TopBar />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import TopBar from './TopBar.vue'
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
