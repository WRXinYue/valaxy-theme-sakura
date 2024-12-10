import { isClient, useCssVar, useScrollLock as useScrollLockCore } from '@vueuse/core'
import { useBackToTop } from 'valaxy'
import { lenisRef } from '../plugins/lenis'
import { useThemeConfig } from '.'

export function useScroll(options: Partial<{
  scrollAnimation: boolean
  scrollDamping: boolean
}> = {}) {
  const themeConfig = useThemeConfig()
  const { percentage, show } = useBackToTop({ offset: 100 })
  const scrollAnimation = options.scrollAnimation ?? themeConfig.value.scrollAnimation
  const scrollDamping = options.scrollDamping ?? themeConfig.value.scrollDamping

  function scrollTo(top: number) {
    if (scrollDamping) {
      lenisRef.value?.scrollTo(top, { offset: 0, immediate: !scrollAnimation })
    }
    else {
      window.scrollTo({ top, behavior: scrollAnimation ? 'smooth' : 'auto' })
    }
  }

  function to(target: Element | string | number, offset: string | number = '--sakura-navbar-height') {
    offset = typeof offset === 'string' ? Number.parseInt(useCssVar(offset).value || '', 10) : offset

    const targetElement = (typeof target === 'string')
      ? document.querySelector(target)
      : (target instanceof Element ? target : null)

    if (!targetElement) {
      console.warn('Target element not found:', target)
      return
    }

    scrollTo(targetElement.clientHeight - offset)
  }

  const toTop = () => scrollTo(0)
  const toDown = () => to('.sakura-hero')

  return { to, toTop, toDown, percentage, show }
}

export function useScrollLock() {
  const themeConfig = useThemeConfig()

  if (!themeConfig.value.scrollLock)
    return

  const isLocked = useScrollLockCore(isClient ? document.body : null)

  return isLocked
}
