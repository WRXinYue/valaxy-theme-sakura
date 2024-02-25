import type { ThemeConfig } from '../types'
import { startScrollDamping } from '../utils/scrollDamping'

export function useSakura(themeConfig: ThemeConfig) {
  if (themeConfig.scrollDamping)
    startScrollDamping()
}
