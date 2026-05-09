<template>
  <div class="register-page">
    <div class="register-card">
      <AILogo :size="36" class="logo" />
      <h2 class="title">{{ isLogin ? t.register.loginTitle : t.register.title }}</h2>

      <form class="form" @submit.prevent="submit">
        <template v-if="!isLogin">
          <div class="field-group">
            <label class="field-label">{{ t.register.name }}</label>
            <input
              v-model="name"
              type="text"
              class="field-input"
              :placeholder="t.register.namePlaceholder"
              autocomplete="name"
            />
          </div>
        </template>

        <div class="field-group">
          <label class="field-label">{{ t.register.email }}</label>
          <input
            v-model="email"
            type="text"
            class="field-input"
            :placeholder="t.register.emailPlaceholder"
            autocomplete="email"
            required
          />
        </div>

        <div class="field-group">
          <label class="field-label">{{ t.register.password }}</label>
          <input
            v-model="password"
            type="password"
            class="field-input"
            :placeholder="t.register.passwordPlaceholder"
            :autocomplete="isLogin ? 'current-password' : 'new-password'"
            required
          />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '...' : (isLogin ? t.register.loginSubmit : t.register.submit) }}
        </button>
      </form>

      <button class="switch-btn" type="button" @click="toggleMode">
        {{ isLogin ? t.register.switchToRegister : t.register.switchToLogin }}
      </button>
      <button class="demo-btn" type="button" @click="enterDemo">
        {{ t.welcome.demo }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/i18n'
import { useAuthStore } from '@/stores/authStore'
import AILogo from '@/components/ui/AILogo.vue'
import { login, register } from '@/modules/auth'
import getStart from '@/modules/getStart'

const { t } = useI18n()
const auth = useAuthStore()

const isLogin = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function toggleMode() {
  isLogin.value = !isLogin.value
  error.value = ''
}

function enterDemo() {
  auth.activationGuest()
  getStart()
}

async function submit() {
  error.value = ''

  if (!isLogin.value && !name.value.trim()) {
    error.value = t.value.register.errorName
    return
  }

  loading.value = true
  try {
    const emailVal = email.value.trim()
    const passwordVal = password.value
    const nameVal = name.value?.trim?.()

    if (isLogin.value) {
      await login({ email: emailVal, password: passwordVal })
    } else {
      await register({ name: nameVal, email: emailVal, password: passwordVal })
    }
    await getStart()
  } catch (e: unknown) {

  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 16px;
}

.register-card {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: fadeUp 0.35s ease both;
}

.logo { border-radius: 10px; }

.title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.3px;
}

.form {
  width: 100%;
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
  background: var(--surface);
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
  margin-top: 4px;
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

.switch-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;
}
.switch-btn:hover { opacity: 0.75; }

.demo-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;
}
.demo-btn:hover { opacity: 0.75; }

</style>
