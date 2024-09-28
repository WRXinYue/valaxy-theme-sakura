import { useScroll as useVUScroll } from '@vueuse/core'
import { scrollToTop } from '../utils/scrollDamping'
import { useThemeConfig } from '.'

export function useScroll(smooth?: 'smooth' | 'auto') {
  const themeConfig = useThemeConfig()

  function toTop() {
    if (!themeConfig.value.scrollDamping) {
      const { y } = useVUScroll(window, { behavior: smooth })
      y.value = 0
    }
    else {
      scrollToTop()
    }
  }

  return { toTop }
}
