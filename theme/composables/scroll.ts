import { useBackToTop } from 'valaxy'
import { scrollToTop } from '../utils/scrollDamping'
import { useThemeConfig } from '.'

export function useScroll() {
  const themeConfig = useThemeConfig()
  const { backToTop } = useBackToTop({ offset: 100 })

  function toTop() {
    if (!themeConfig.value.scrollDamping) {
      backToTop!()
    }
    else {
      scrollToTop()
    }
  }

  return { toTop }
}
