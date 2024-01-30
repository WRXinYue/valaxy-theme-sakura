import { computed } from 'vue'
import { useConfig } from 'valaxy'
import type { ThemeConfig } from '../types'
import 'animate.css'

/**
 * getThemeConfig
 */
export function useThemeConfig<T = ThemeConfig>() {
  const config = useConfig<T>()
  return computed(() => config!.value.themeConfig)
}
