import { isClient } from '@vueuse/core'
import { scrollToTop } from '../utils/scrollDamping'
import { useThemeConfig } from '.'

export function useScroll(smooth = false) {
  const themeConfig = useThemeConfig()

  function toTop() {
    if (!themeConfig.value.scrollDamping) {
      if (!smooth) {
        window.scrollTo({ top: 0 })
      }
      else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    else {
      if (isClient)
        scrollToTop()
    }
  }

  return { toTop }
}
