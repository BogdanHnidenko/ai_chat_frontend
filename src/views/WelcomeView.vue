<template>
  <div class="welcome" ref="pageRef">

    <!-- Settings button -->
    <div class="settings-wrap" ref="settingsRef">
      <button
        class="settings-btn"
        :class="{ active: menuOpen }"
        @click="menuOpen = !menuOpen"
        :title="t.welcome.settings"
      >
        <SvgIcon iconName="settings" :size="17" />
      </button>

      <Transition name="drop">
        <div v-if="menuOpen" class="menu">

          <!-- Language row -->
          <div
            class="menu-item has-sub"
            :class="{ 'sub-open': langOpen }"
            @click.stop="langOpen = !langOpen"
            ref="langRowRef"
          >
            <SvgIcon iconName="globe" :size="14" />
            <span>{{ t.welcome.language }}</span>
            <span class="menu-item-value">{{ currentLang.label }}</span>
            <SvgIcon :iconName="langOpen ? 'chevronUp' : 'chevronDown'" :size="12" class="row-chevron" />

            <!-- Sub-dropdown — positioned relative to this row -->
            <Transition name="drop">
              <div v-if="langOpen" class="submenu" @click.stop>
                <button
                  v-for="lang in LANGUAGES"
                  :key="lang.code"
                  class="submenu-item"
                  :class="{ active: selectedLang === lang.code }"
                  @click="selectLang(lang.code)"
                >
                  {{ lang.label }}
                  <SvgIcon v-if="selectedLang === lang.code" iconName="check" :size="12" class="check-icon" />
                </button>
              </div>
            </Transition>
          </div>

        </div>
      </Transition>
    </div>

    <!-- Hero -->
    <div class="welcome-card">
      <AILogo :size="56" class="logo" />
      <h1 class="title">Aether</h1>
      <p class="subtitle">{{ t.welcome.subtitle }}</p>
      <div class="cta-row">
        <button class="start-btn" @click="router.push('/register')">
          {{ t.welcome.start }}
          <SvgIcon iconName="arrowRight" :size="16" />
        </button>
        <button class="demo-btn" @click="enterDemo">
          {{ t.welcome.demo }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useI18n, PENDING_LANG_KEY } from '@/i18n'
import AILogo from '@/components/ui/AILogo.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useUiStore } from '@/stores/uiStore'
import getStart from '@/modules/getStart'

const LANGUAGES = [
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
]

const router = useRouter()
const auth = useAuthStore()
const uiStore = useUiStore()
const { t } = useI18n()

const menuOpen = ref(false)
const langOpen = ref(false)
const settingsRef = ref<HTMLElement | null>(null)

const selectedLang = ref(uiStore?.language ?? localStorage.getItem(PENDING_LANG_KEY) ?? 'uk')
const currentLang = computed(() => LANGUAGES.find(l => l.code === selectedLang.value)!)

function selectLang(code: string) {
  selectedLang.value = code
  uiStore.setLang(code)
  langOpen.value = false
  menuOpen.value = false
}

function enterDemo() {
  auth.activationGuest()
  getStart()
}

function onClickOutside(e: MouseEvent) {
  if (settingsRef.value && !settingsRef.value.contains(e.target as Node)) {
    menuOpen.value = false
    langOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<style scoped>
.welcome {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

/* Settings trigger */
.settings-wrap {
  position: absolute;
  top: 16px;
  right: 16px;
}

.settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.14s, color 0.14s, border-color 0.14s;
}
.settings-btn:hover,
.settings-btn.active {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.14);
  color: var(--text);
}

/* Main dropdown */
.menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 210px;
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 11px;
  padding: 5px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 8px 10px;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s, color 0.1s;
  user-select: none;
}
.menu-item:hover,
.menu-item.sub-open {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
}

.menu-item-value {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-dim);
}

.row-chevron {
  flex-shrink: 0;
  color: var(--text-dim);
}

/* Sub-dropdown — floats to the left of the row */
.submenu {
  position: absolute;
  top: 0;
  right: calc(100% + 6px);
  min-width: 160px;
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 200;
}

.submenu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 11px;
  background: none;
  border: none;
  border-radius: 7px;
  color: var(--text-muted);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s, color 0.1s;
}
.submenu-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
}
.submenu-item.active {
  color: var(--accent);
}

.check-icon {
  margin-left: auto;
  color: var(--accent);
}

/* Hero */
.welcome-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: fadeUp 0.4s ease both;
}

.logo {
  border-radius: 16px;
  margin-bottom: 4px;
}

.title {
  font-size: 36px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.cta-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.start-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: var(--accent);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
  width: 100%;
  justify-content: center;
}
.start-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.start-btn:active { transform: translateY(0); }

.demo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 11px 28px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
}
.demo-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.22);
  color: var(--text);
  transform: translateY(-1px);
}
.demo-btn:active { transform: translateY(0); }

/* Transitions */
.drop-enter-active,
.drop-leave-active { transition: opacity 0.14s, transform 0.14s; }
.drop-enter-from,
.drop-leave-to { opacity: 0; transform: translateY(-4px) scale(0.98); }
</style>
