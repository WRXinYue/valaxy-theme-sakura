import type { Router } from 'vue-router'
import { nextTick } from 'vue'
import { loadRouteLocation } from 'vue-router'

// Warm the lazy route on interaction so its first import need not hold the old snapshot.
const pendingLoads = new Set<string>()

export function preloadPostRoute(router: Router, path?: string) {
  if (!path?.startsWith('/') || path.startsWith('//') || pendingLoads.has(path))
    return

  pendingLoads.add(path)
  void loadRouteLocation(router.resolve(path)).catch(() => {
    // Normal navigation retries if an optional preload failed.
  }).finally(() => pendingLoads.delete(path))
}

let transitioning = false

export async function openPostCover(
  event: MouseEvent,
  router: Router,
  path: string | undefined,
  source: HTMLElement | null,
  image?: string | null,
) {
  if (!path?.startsWith('/') || path.startsWith('//') || event.defaultPrevented
    || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  event.preventDefault()
  if (transitioning)
    return

  const route = router.resolve(path)
  const navigate = () => router.push({
    path: route.path,
    query: route.query,
    hash: route.hash,
    state: source
      ? { sakuraCover: image || null }
      : undefined,
  })
  if (!source || !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    await navigate()
    return
  }

  const card = source.closest('[data-post-card]')
  const title = card?.querySelector<HTMLElement>('[data-post-title]')
  const date = card?.querySelector<HTMLElement>('.post-date dd')
  let arrivalDate: HTMLElement | undefined
  function clearTextNames() {
    title?.style.removeProperty('view-transition-name')
    date?.style.removeProperty('view-transition-name')
  }

  transitioning = true
  if (title)
    title.style.viewTransitionName = 'sakura-post-heading'
  if (date)
    date.style.viewTransitionName = 'sakura-post-date'
  source.style.viewTransitionName = 'sakura-post-cover'
  const root = document.documentElement
  root.style.setProperty('--sakura-cover-radius-from', getComputedStyle(source).borderRadius)
  root.classList.add('sakura-post-leaving')
  try {
    const transition = document.startViewTransition(async () => {
      source.style.viewTransitionName = ''
      clearTextNames()
      const failure = await navigate()
      await nextTick()
      // Name the destination only after capturing the source, even on post-to-post navigation.
      if (!failure && router.currentRoute.value.fullPath === route.fullPath) {
        const cover = document.querySelector('.sakura-post-header .sakura-header-cover')
        if (cover)
          root.style.setProperty('--sakura-cover-radius-to', getComputedStyle(cover).borderRadius)
        root.classList.add('sakura-post-transition')
        if (date) {
          const header = document.querySelector('.sakura-post-header-meta')
          const target = header?.querySelector<HTMLElement>('.edited-time dd')
            || header?.querySelector<HTMLElement>('.posted-time dd')
          if (target && target.textContent === date.textContent) {
            arrivalDate = target
            arrivalDate.style.viewTransitionName = 'sakura-post-date'
          }
        }
      }
    })
    await transition.finished
  }
  finally {
    clearTextNames()
    arrivalDate?.style.removeProperty('view-transition-name')
    source.style.viewTransitionName = ''
    root.classList.remove('sakura-post-leaving', 'sakura-post-transition')
    root.style.removeProperty('--sakura-cover-radius-from')
    root.style.removeProperty('--sakura-cover-radius-to')
    transitioning = false
  }
}
