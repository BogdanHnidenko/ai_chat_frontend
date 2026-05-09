<template>
  <div class="code-block">
    <div class="code-header">
      <span class="code-lang">{{ lang ?? 'code' }}</span>
      <button class="copy-btn" @click="copy(code)">
        {{ copied ? t.code.copied : t.code.copy }}
      </button>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/i18n'

defineProps<{ code: string; lang?: string }>()

const copied = ref(false)
const { t } = useI18n()

function copy(code: string) {
  navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<style scoped>
.code-block {
  background: var(--code-bg);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}
.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.code-lang {
  font-size: 11px;
  color: var(--text-muted);
  font-family: 'DM Mono', monospace;
}
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 11px;
  font-family: inherit;
  transition: color 0.12s;
}
.copy-btn:hover {
  color: var(--text);
}
pre {
  padding: 14px 16px;
  overflow-x: auto;
  margin: 0;
}
code {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
}
</style>
