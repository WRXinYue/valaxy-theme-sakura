import { isClient } from '@vueuse/core'
import { ref } from 'vue'

export function useTheme() {
  const themes = ref(['sakura'])
  const curTheme = ref('sakura')

  if (isClient) {
    const savedTheme = localStorage.getItem('theme')
    curTheme.value = savedTheme || curTheme.value
    document.documentElement.setAttribute('data-theme', curTheme.value)
  }

  function toggleTheme(theme: string) {
    curTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  return {
    themes,
    curTheme,
    toggleTheme,
  }
}
