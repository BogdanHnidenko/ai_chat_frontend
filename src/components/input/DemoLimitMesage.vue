<template>
  <div class="demo-limit-banner">
    <span>{{ t.demoLimit.messageLimitMessage }}</span>
    <button class="banner-login-btn" @click="loginOpen = true">{{ t.demoLimit.login }}</button>
  </div>
  <LoginModal v-model="loginOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/i18n'
import LoginModal from '@/components/ui/LoginModal.vue'

const { t } = useI18n()
const loginOpen = ref(false)
</script>

<style scoped>
.demo-limit-banner {
  max-width: 720px;
  margin: 0 auto 10px;
  padding: 10px 14px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}

.banner-login-btn {
  flex-shrink: 0;
  padding: 5px 12px;
  background: var(--accent);
  border: none;
  border-radius: 7px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
  margin-left: auto;
}
.banner-login-btn:hover {
  opacity: 0.88;
}
</style>
