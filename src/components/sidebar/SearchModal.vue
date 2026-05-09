<template>
  <BaseModal v-model="isOpen" width="480px" :closeOnBackdrop="true">
    <div class="search-modal">
      <div class="search-field-wrap">
        <SvgIcon iconName="search" :size="16" class="field-icon" />
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          :placeholder="t.search.placeholder"
          class="search-field"
          @keydown.down.prevent="moveSelection(1)"
          @keydown.up.prevent="moveSelection(-1)"
          @keydown.enter.prevent="openSelected"
          @keydown.esc="isOpen = false"
        />
        <button class="close-btn" @click="isOpen = false" :title="t.search.close">
          <SvgIcon iconName="close" :size="12" />
        </button>
      </div>

      <div v-if="results.length" class="results-list">
        <button
          v-for="(item, i) in results"
          :key="item.id"
          class="result-item"
          :class="{ selected: i === selectedIndex }"
          @mouseenter="selectedIndex = i"
          @click="openItem(item)"
        >
          <span class="result-icon">
            <SvgIcon iconName="newChat" :size="14" />
          </span>
          <span class="result-body">
            <span class="result-title">{{ item.title }}</span>
          </span>
        </button>
      </div>

      <div v-else-if="query.trim()" class="no-results">
        {{ t.search.noResults }}
      </div>

      <div v-else class="empty-hint">
        {{ t.search.hint }}
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'
import { useI18n } from '@/i18n'
import BaseModal from '@/components/ui/BaseModal.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'

const isOpen = defineModel<boolean>({ required: true })
const { t } = useI18n()

const router = useRouter()
const chatStore = useChatStore()

const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

type ResultItem = { id: string; title: string }

const results = computed<ResultItem[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []

  const results: ResultItem[] = []
  for (const c of chatStore.chats) {
    if (c.title.toLowerCase().includes(q)) {
      results.push({ id: c.id, title: c.title })
      if (results.length === 5) break
    }
  }
  return results
})

watch(results, () => { selectedIndex.value = 0 })

watch(isOpen, async (val) => {
  if (val) {
    query.value = ''
    selectedIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

function moveSelection(dir: 1 | -1) {
  const len = results.value.length
  if (!len) return
  selectedIndex.value = (selectedIndex.value + dir + len) % len
}

function openSelected() {
  const item = results.value[selectedIndex.value]
  if (item) openItem(item)
}

function openItem(item: ResultItem) {
  chatStore.setActiveChat(item.id)
  router.push('/chats')
  isOpen.value = false
}
</script>

<style scoped>
.search-modal {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
}

.search-field-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 8px;
}

.field-icon {
  color: var(--text-dim);
  flex-shrink: 0;
}

.search-field {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
}
.search-field::placeholder {
  color: var(--text-dim);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: none;
  border: none;
  border-radius: 6px;
  color: var(--text-dim);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
}
.result-item:hover,
.result-item.selected {
  background: rgba(255, 255, 255, 0.07);
}

.result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-muted);
  flex-shrink: 0;
}

.result-body {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.result-title {
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-type {
  font-size: 11px;
  color: var(--text-dim);
}

.no-results,
.empty-hint {
  text-align: center;
  font-size: 13px;
  color: var(--text-dim);
  padding: 20px 0 8px;
}
</style>
