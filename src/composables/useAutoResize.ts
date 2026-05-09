import { type Ref } from 'vue'

export function useAutoResize(el: Ref<HTMLTextAreaElement | null>) {
  function resize() {
    if (!el.value) return
    el.value.style.height = '24px'
    el.value.style.height = Math.min(el.value.scrollHeight, 140) + 'px'
  }
  return { resize }
}
