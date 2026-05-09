import { useUiStore } from '@/stores/uiStore'

export function useTheme() {
  const ui = useUiStore()

  function toggleTheme() {
    ui.setTheme(ui.theme === 'dark' ? 'light' : 'dark')
  }

  return { toggleTheme }
}
