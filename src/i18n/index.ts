import { computed, ref } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import uk from './uk'
import en from './en'
import de from './de'
import fr from './fr'

export type Translations = typeof uk

const locales: Record<string, Translations> = { uk, en, de, fr }

export const PENDING_LANG_KEY = 'pending_lang'

const DEFAULT_LANG = 'en'

function detectBrowserLang(): string {
  const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language]

  for (const browserLang of browserLangs) {
    if (!browserLang) continue
    const code = browserLang.toLowerCase().split('-')[0]
    const match = Object.keys(locales).find((locale) => locale.toLowerCase() === code)
    if (match) return match
  }

  return DEFAULT_LANG
}

// Глобальний реактивний ref — оновлюється з WelcomeView до логіну
export const pendingLang = ref(localStorage.getItem(PENDING_LANG_KEY) ?? detectBrowserLang())

export function useI18n() {
  const uiStore = useUiStore()

  const t = computed<Translations>(() => {
    const lang = uiStore.language ?? pendingLang.value
    return locales[lang] ?? uk
  })

  return { t }
}
