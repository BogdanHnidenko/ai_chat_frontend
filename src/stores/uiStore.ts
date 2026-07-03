import { defineStore } from 'pinia'
import type { ThemeType } from '@/types'
import { PENDING_LANG_KEY, pendingLang } from '@/i18n'

export const useUiStore = defineStore('ui', {
  state: () => ({
    sidebarOpen: true,
    theme: 'dark' as ThemeType,
    language: pendingLang.value,
    showChatDeletedModal: false,
  }),
  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    setTheme(t: ThemeType) {
      this.theme = t
      document.documentElement.setAttribute('data-theme', t)
    },
    setLang(code: string) {
      this.language = code
      pendingLang.value = code
      localStorage.setItem(PENDING_LANG_KEY, code)
    }
  },
})
