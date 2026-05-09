<template>
  <BaseModal v-model="isOpen" :title="t.presets.title" width="460px">
    <div class="presets">
      <p class="hint">{{ t.presets.hint }}</p>

      <div v-if="presetStore.presets.length" class="list">
        <div
          v-for="preset in presetStore.presets"
          :key="preset.id"
          class="preset-item"
        >
          <div v-if="editingId !== preset.id" class="preset-view">
            <div class="preset-texts">
              <div class="preset-name">{{ preset.name }}</div>
              <div class="preset-desc">{{ preset.description }}</div>
            </div>
            <div class="preset-actions">
              <button class="icon-btn" :title="t.presets.editTitle" @click="startEdit(preset)">
                <SvgIcon iconName="rename" :size="13" />
              </button>
              <button class="icon-btn danger" :title="t.presets.deleteTitle" @click="askDeletePreset(preset.id)">
                <SvgIcon iconName="trash" :size="13" />
              </button>
            </div>
          </div>

          <div v-else class="preset-edit">
            <input v-model="editName" class="field-input" :placeholder="t.presets.nameEditPlaceholder" />
            <textarea v-model="editDesc" class="field-textarea" :placeholder="t.presets.descEditPlaceholder" rows="3" />
            <div class="edit-btns">
              <button class="btn-save" @click="saveEdit(preset.id)">{{ t.presets.save }}</button>
              <button class="btn-cancel" @click="editingId = null">{{ t.presets.cancel }}</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty">{{ t.presets.empty }}</div>

      <template v-if="auth.isGuest">
        <div class="guest-banner">
          <span>{{ t.presetsGuest.message }}</span>
          <button class="banner-login-btn" @click="loginOpen = true">{{ t.presetsGuest.login }}</button>
        </div>
      </template>

      <template v-else>
        <div v-if="!adding" class="add-row">
          <button class="add-btn" @click="adding = true">
            <SvgIcon iconName="plus" :size="14" />
            {{ t.presets.add }}
          </button>
        </div>

        <div v-else class="preset-edit new-preset">
          <input v-model="newName" class="field-input" :placeholder="t.presets.namePlaceholder" />
          <textarea v-model="newDesc" class="field-textarea" :placeholder="t.presets.descPlaceholder" rows="3" />
          <div class="edit-btns">
            <button class="btn-save" @click="addPreset">{{ t.presets.addBtn }}</button>
            <button class="btn-cancel" @click="adding = false; newName = ''; newDesc = ''">{{ t.presets.cancel }}</button>
          </div>
        </div>
      </template>
    </div>
  </BaseModal>

  <LoginModal v-model="loginOpen" />

  <ConfirmModal
    v-model="confirmDeleteOpen"
    :title="t.confirmDelete.presetTitle"
    :message="t.confirmDelete.presetMessage"
    @confirm="confirmDeletePreset"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { usePresetStore } from '@/stores/presetStore'
import type { PresetType } from '@/types'

import { useI18n } from '@/i18n'
import BaseModal from '@/components/ui/BaseModal.vue'
import LoginModal from '@/components/ui/LoginModal.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'

const isOpen = defineModel<boolean>({ required: true })
const auth = useAuthStore()
const presetStore = usePresetStore()
const { t } = useI18n()
const loginOpen = ref(false)
const confirmDeleteOpen = ref(false)
const pendingDeleteId = ref<string | null>(null)

const adding = ref(false)
const newName = ref('')
const newDesc = ref('')

const editingId = ref<string | null>(null)
const editName = ref('')
const editDesc = ref('')

function addPreset() {
  if (!newName.value.trim()) return
  presetStore.addPreset(newName.value.trim(), newDesc.value.trim())
  newName.value = ''
  newDesc.value = ''
  adding.value = false
}

function askDeletePreset(id: string) {
  pendingDeleteId.value = id
  confirmDeleteOpen.value = true
}

function confirmDeletePreset() {
  if (pendingDeleteId.value) presetStore.deletePreset(pendingDeleteId.value)
  pendingDeleteId.value = null
}

function startEdit(preset: PresetType) {
  editingId.value = preset.id
  editName.value = preset.name
  editDesc.value = preset.description
}

function saveEdit(id: string) {
  if (!editName.value.trim()) return
  presetStore.updatePreset(id, editName.value.trim(), editDesc.value.trim())
  editingId.value = null
}
</script>

<style scoped>
.presets {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hint {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preset-item {
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9px;
  overflow: hidden;
}

.preset-view {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
}

.preset-texts { flex: 1; min-width: 0; }
.preset-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
}
.preset-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
  line-height: 1.4;
  white-space: pre-wrap;
}

.preset-actions {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: none;
  border: none;
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}
.icon-btn:hover { background: rgba(255,255,255,0.07); color: var(--text); }
.icon-btn.danger:hover { background: rgba(224,85,85,0.12); color: #ff6b6b; }

.preset-edit, .new-preset {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(255,255,255,0.02);
}

.field-input, .field-textarea {
  background: var(--surface);
  border: 1px solid var(--input-border);
  border-radius: 8px;
  padding: 8px 11px;
  font-size: 13px;
  font-family: inherit;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s;
  resize: none;
}
.field-input::placeholder, .field-textarea::placeholder { color: var(--text-dim); }
.field-input:focus, .field-textarea:focus { border-color: var(--accent); }

.edit-btns {
  display: flex;
  gap: 6px;
}

.btn-save, .btn-cancel {
  padding: 6px 14px;
  border: none;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn-save { background: var(--accent); color: #fff; }
.btn-save:hover { opacity: 0.85; }
.btn-cancel { background: rgba(255,255,255,0.07); color: var(--text-muted); }
.btn-cancel:hover { background: rgba(255,255,255,0.11); }

.empty {
  font-size: 13px;
  color: var(--text-dim);
  text-align: center;
  padding: 8px 0;
}

.guest-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-radius: 10px;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

.banner-login-btn {
  flex-shrink: 0;
  margin-left: auto;
  padding: 6px 14px;
  background: var(--accent);
  border: none;
  border-radius: 7px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
}
.banner-login-btn:hover { opacity: 0.88; }

.add-row { display: flex; }
.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: rgba(255,255,255,0.05);
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.13s, border-color 0.13s, color 0.13s;
}
.add-btn:hover {
  background: rgba(255,255,255,0.08);
  border-color: var(--accent);
  color: var(--text);
}
</style>
