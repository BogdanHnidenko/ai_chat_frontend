<template>
  <div class="reactions">
    <button class="reaction-btn" :class="{ active: liked === true }" @click="liked = liked === true ? null : true" :title="t.reactions.like">
      <SvgIcon iconName="thumbUp" :size="13" />
    </button>
    <button class="reaction-btn" :class="{ active: liked === false }" @click="liked = liked === false ? null : false" :title="t.reactions.dislike">
      <SvgIcon iconName="thumbDown" :size="13" />
    </button>
    <button class="reaction-btn" @click="copy" :title="t.reactions.copy">
      <SvgIcon :iconName="copied ? 'check' : 'copy'" :size="13" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useI18n } from '@/i18n'

const liked = ref<boolean | null>(null)
const { t } = useI18n()
const copied = ref(false)

function copy() {
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<style scoped>
.reactions {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}
.reaction-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-dim);
  padding: 4px 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background 0.12s, color 0.12s;
}
.reaction-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-muted);
}
.reaction-btn.active {
  color: var(--accent);
}
</style>
