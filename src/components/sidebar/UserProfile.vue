<template>
  <div class="user-profile-wrap" ref="wrapRef">
    <button
      class="user-trigger"
      :class="{ active: dropdownOpen }"
      @click="toggleDropdown"
    >
      <div class="avatar" :class="{ 'avatar-guest': auth.isGuest }">
        <img v-if="auth.user?.avatarUrl" :src="auth.user.avatarUrl" class="avatar-img" />
        <SvgIcon v-else-if="auth.isGuest" iconName="user" :size="15" />
        <span v-else>{{ auth.user?.name[0]?.toUpperCase() }}</span>
      </div>
      <div class="user-info">
        <div class="user-name">{{ auth.isGuest ? t.profile.guestName : auth.user?.name }}</div>
        <div class="user-sub">{{ auth.isGuest ? t.profile.guestSub : auth.user?.email }}</div>
      </div>
      <SvgIcon :iconName="dropdownOpen ? 'chevronUp' : 'chevronDown'" :size="13" class="chevron" />
    </button>

    <Transition name="dropdown">
      <div v-if="dropdownOpen" class="dropdown">

        <!-- Theme row -->
        <div
          ref="themeRowRef"
          class="menu-item has-sub"
          :class="{ 'sub-open': themeOpen }"
          @click.stop="toggleSub('theme')"
        >
          <SvgIcon :iconName="ui.theme === 'dark' ? 'moon' : 'sun'" :size="14" />
          <span>{{ t.profile.theme }}</span>
          <span class="menu-item-value">{{ ui.theme === 'dark' ? t.profile.themeDark : t.profile.themeLight }}</span>
          <SvgIcon :iconName="themeOpen ? 'chevronUp' : 'chevronDown'" :size="12" class="row-chevron" />
        </div>

        <!-- Language row -->
        <div
          ref="langRowRef"
          class="menu-item has-sub"
          :class="{ 'sub-open': langOpen }"
          @click.stop="toggleSub('lang')"
        >
          <SvgIcon iconName="globe" :size="14" />
          <span>{{ t.profile.language }}</span>
          <span class="menu-item-value">{{ currentLang.label }}</span>
          <SvgIcon :iconName="langOpen ? 'chevronUp' : 'chevronDown'" :size="12" class="row-chevron" />
        </div>

        <div class="divider" />

        <!-- Presets -->
        <button class="menu-item" @click="presetsOpen = true; dropdownOpen = false">
          <SvgIcon iconName="sliders" :size="14" />
          <span>{{ t.profile.presets }}</span>
          <span v-if="presetStore.presets.length" class="badge">{{ presetStore.presets.length }}</span>
        </button>

        <div class="divider" />

        <!-- Logout / Login -->
        <button v-if="auth.isGuest" class="menu-item accent" @click="loginOpen = true; dropdownOpen = false">
          <SvgIcon iconName="logIn" :size="14" />
          <span>{{ t.profile.login }}</span>
        </button>
        <button v-else class="menu-item danger" @click="logout">
          <SvgIcon iconName="logOut" :size="14" />
          <span>{{ t.profile.logout }}</span>
        </button>

      </div>
    </Transition>
  </div>

  <!-- Theme submenu — teleported to body to escape overflow:hidden -->
  <Teleport to="body">
    <Transition name="sub">
      <div v-if="themeOpen" class="teleport-submenu" :style="themeSubStyle" @mousedown.stop>
        <button
          class="submenu-item"
          :class="{ active: ui.theme === 'dark' }"
          @click="selectTheme('dark')"
        >
          <SvgIcon iconName="moon" :size="13" />
          {{ t.profile.themeDark }}
          <SvgIcon v-if="ui.theme === 'dark'" iconName="check" :size="12" class="check-icon" />
        </button>
        <button
          class="submenu-item"
          :class="{ active: ui.theme === 'light' }"
          @click="selectTheme('light')"
        >
          <SvgIcon iconName="sun" :size="13" />
          {{ t.profile.themeLight }}
          <SvgIcon v-if="ui.theme === 'light'" iconName="check" :size="12" class="check-icon" />
        </button>
      </div>
    </Transition>
  </Teleport>

  <!-- Language submenu — teleported to body -->
  <Teleport to="body">
    <Transition name="sub">
      <div v-if="langOpen" class="teleport-submenu" :style="langSubStyle" @mousedown.stop>
        <button
          v-for="lang in LANGUAGES"
          :key="lang.code"
          class="submenu-item"
          :class="{ active: ui?.language === lang.code }"
          @click="selectLang(lang.code)"
        >
          {{ lang.label }}
          <SvgIcon v-if="ui?.language === lang.code" iconName="check" :size="12" class="check-icon" />
        </button>
      </div>
    </Transition>
  </Teleport>

  <PresetsModal v-model="presetsOpen" />
  <LoginModal v-model="loginOpen" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { usePresetStore } from '@/stores/presetStore'
import { useUiStore } from '@/stores/uiStore'
import { useI18n } from '@/i18n'
import type { ThemeType } from '@/types'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import PresetsModal from '@/components/ui/PresetsModal.vue'
import LoginModal from '@/components/ui/LoginModal.vue'

const LANGUAGES = [
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
]

const auth = useAuthStore()
const presetStore = usePresetStore()
const ui = useUiStore()
const router = useRouter()
const { t } = useI18n()

const dropdownOpen = ref(false)
const themeOpen = ref(false)
const langOpen = ref(false)
const presetsOpen = ref(false)
const loginOpen = ref(false)
const wrapRef = ref<HTMLElement | null>(null)
const themeRowRef = ref<HTMLElement | null>(null)
const langRowRef = ref<HTMLElement | null>(null)

const themeSubStyle = ref<Record<string, string>>({})
const langSubStyle = ref<Record<string, string>>({})

const currentLang = computed(
  () => LANGUAGES.find(l => l.code === ui?.language) ?? LANGUAGES[0]!
)

function calcSubStyle(rowEl: HTMLElement): Record<string, string> {
  const rect = rowEl.getBoundingClientRect()
  return {
    position: 'fixed',
    top: `${rect.top}px`,
    left: `${rect.right + 6}px`,
    zIndex: '9999',
  }
}

function toggleSub(which: 'theme' | 'lang') {
  if (which === 'theme') {
    const opening = !themeOpen.value
    themeOpen.value = opening
    langOpen.value = false
    if (opening && themeRowRef.value) {
      themeSubStyle.value = calcSubStyle(themeRowRef.value)
    }
  } else {
    const opening = !langOpen.value
    langOpen.value = opening
    themeOpen.value = false
    if (opening && langRowRef.value) {
      langSubStyle.value = calcSubStyle(langRowRef.value)
    }
  }
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
  if (!dropdownOpen.value) {
    themeOpen.value = false
    langOpen.value = false
  }
}

function selectTheme(t: ThemeType) {
  ui.setTheme(t)
  themeOpen.value = false
}

function selectLang(code: string) {
  ui.setLang(code)
  langOpen.value = false
}

function logout() {
  auth.logout()
  dropdownOpen.value = false
  router.push('/welcome')
}

function onClickOutside(e: MouseEvent) {
  if (wrapRef.value && !wrapRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
    themeOpen.value = false
    langOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<style scoped>
.user-profile-wrap {
  position: relative;
  border-top: 1px solid var(--sidebar-border);
  padding: 8px;
  flex-shrink: 0;
}

/* Trigger */
.user-trigger {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 6px 8px;
  background: none;
  border: 1px solid transparent;
  border-radius: 9px;
  cursor: pointer;
  text-align: left;
  transition: background 0.13s, border-color 0.13s;
}
.user-trigger:hover,
.user-trigger.active {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}
.avatar-guest {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--text-muted);
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info { flex: 1; min-width: 0; }
.user-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-sub {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron {
  color: var(--text-muted);
  flex-shrink: 0;
}

/* Main dropdown */
.dropdown {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 8px;
  right: 8px;
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 5px;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
  z-index: 200;
}

/* Menu rows */
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
.menu-item.danger { color: #e05555; }
.menu-item.danger:hover { background: rgba(224, 85, 85, 0.1); color: #ff6b6b; }
.menu-item.accent { color: var(--accent); }
.menu-item.accent:hover { background: var(--accent-light); }

.menu-item-value {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-dim);
}

.row-chevron {
  flex-shrink: 0;
  color: var(--text-dim);
}

/* Sub-dropdown — rendered via Teleport to escape overflow:hidden */
.teleport-submenu {
  min-width: 160px;
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.submenu-item {
  display: flex;
  align-items: center;
  gap: 8px;
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
.submenu-item.active { color: var(--accent); }

.check-icon {
  margin-left: auto;
  color: var(--accent);
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 3px 4px;
}

.badge {
  margin-left: auto;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 10px;
  padding: 1px 7px;
  font-size: 11px;
  font-weight: 600;
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translateY(6px); }

.sub-enter-active,
.sub-leave-active { transition: opacity 0.12s, transform 0.12s; }
.sub-enter-from,
.sub-leave-to { opacity: 0; transform: translateX(-4px) scale(0.97); }
</style>
