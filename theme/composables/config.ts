import { useSakuraThemeConfig } from 'valaxy-addon-sakura'
import type { ThemeConfig } from '../types'
import { useSakuraAppStore } from '../stores'

/**
 * getThemeConfig
 */
export function useThemeConfig<T = ThemeConfig>() {
  const sakura = useSakuraAppStore()
  const themeConfig = useSakuraThemeConfig<T>(sakura.curTheme)

  return themeConfig
}
