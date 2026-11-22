import { isClient, useCssVar, useScrollLock as useScrollLockCore } from '@vueuse/core'
import { useBackToTop } from 'valaxy'
import { useThemeConfig } from '.'
import { lenisRef } from '../plugins/lenis'

export function useScroll(options: Partial<{
  scrollAnimation: boolean
  scrollDamping: boolean
}> = {}) {
  const themeConfig = useThemeConfig()
  const { percentage, show } = useBackToTop({ offset: 100 })
  const scrollAnimation = options.scrollAnimation ?? themeConfig.value.scrollAnimation
  const scrollDamping = options.scrollDamping ?? themeConfig.value.scrollDamping

  function resolveOffset(offset: string | number) {
    if (typeof offset !== 'string')
      return offset

    const v = Number.parseInt(useCssVar(offset).value || '', 10)
    return Number.isFinite(v) ? v : 0
  }

  function scrollTo(top: number) {
    if (scrollDamping) {
      lenisRef.value?.scrollTo(top, { offset: 0, immediate: !scrollAnimation })
    }
    else {
      window.scrollTo({ top, behavior: scrollAnimation ? 'smooth' : 'auto' })
    }
  }

  function to(target: Element | string | number, offset: string | number = '--sakura-navbar-height') {
    offset = resolveOffset(offset)

    if (typeof target === 'number') {
      scrollTo(target)
      return
    }

    const targetElement = (typeof target === 'string')
      ? document.querySelector(target)
      : (target instanceof Element ? target : null)

    if (!targetElement) {
      console.warn('Target element not found:', target)
      return
    }

    const top = window.scrollY + targetElement.getBoundingClientRect().top - offset
    scrollTo(Math.max(0, top))
  }

  const toTop = () => scrollTo(0)
  const toDown = (offset: string | number = '--sakura-navbar-height') => to('.sakura-home', offset)

  return { to, toTop, toDown, percentage, show }
}

export function useScrollLock() {
  const themeConfig = useThemeConfig()

  if (!themeConfig.value.scrollLock)
    return

  const isLocked = useScrollLockCore(isClient ? document.body : null)

  return isLocked
}
