<template>
  <BaseModal :modelValue="modelValue" :title="t.loginModal.title" width="360px" @update:modelValue="emit('update:modelValue', $event)" @cancel="emit('update:modelValue', false)">
    <form class="form" @submit.prevent="submit">
      <div class="field-group">
        <label class="field-label">{{ t.loginModal.email }}</label>
        <input
          v-model="email"
          type="text"
          class="field-input"
          :placeholder="t.loginModal.emailPlaceholder"
          autocomplete="email"
        />
      </div>

      <div class="field-group">
        <label class="field-label">{{ t.loginModal.password }}</label>
        <input
          v-model="password"
          type="password"
          class="field-input"
          :placeholder="t.loginModal.passwordPlaceholder"
          autocomplete="current-password"
        />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <button type="submit" class="submit-btn">{{ t.loginModal.submit }}</button>

      <p class="register-hint">
        {{ t.loginModal.noAccount }}
        <a class="register-link" @click.prevent="goRegister">{{ t.loginModal.register }}</a>
      </p>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from '@/i18n'
import BaseModal from '@/components/ui/BaseModal.vue'
import { login } from '@/modules/auth'
import getStart from '@/modules/getStart'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const router = useRouter()
const auth = useAuthStore()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  await login({ email: email.value.trim(), password: password.value })
  await getStart()
  emit('update:modelValue', false)
}

function goRegister() {
  emit('update:modelValue', false)
  auth.logout()
  router.push('/register')
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
}

.field-input {
  background: var(--bg);
  border: 1px solid var(--input-border);
  border-radius: 9px;
  padding: 10px 13px;
  font-size: 13px;
  font-family: inherit;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s;
}
.field-input::placeholder { color: var(--text-dim); }
.field-input:focus { border-color: var(--accent); }

.error-msg {
  font-size: 12px;
  color: #e05555;
  margin: -4px 0;
}

.submit-btn {
  padding: 11px;
  background: var(--accent);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}
.submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.submit-btn:active { transform: translateY(0); }

.register-hint {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.register-link {
  color: var(--accent);
  cursor: pointer;
  text-decoration: none;
  margin-left: 4px;
}
.register-link:hover { text-decoration: underline; }
</style>
