<template>
  <div class="typing">
    <span v-for="i in 3" :key="i" class="dot" :style="{ animationDelay: `${(i - 1) * 0.2}s` }" />
  </div>
</template>

<style scoped>
.typing {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 4px 0;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 1.4s ease-in-out infinite;
}
</style>
