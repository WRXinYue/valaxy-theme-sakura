import type { Router } from 'vue-router'
import { scrollTo } from 'valaxy'
import { nextTick } from 'vue'
import { useSakuraAppStore } from '../../stores'

export function toScrollPosition(router: Router) {
  const sakuraAppStore = useSakuraAppStore()

  const defaultScroll = router.options.scrollBehavior
  router.options.scrollBehavior = (to, from, savedPosition) => {
    if (to.fullPath !== from.fullPath && !to.hash) {
      return {
        top: sakuraAppStore.getScrollPosition(to.path),
        behavior: 'instant',
      }
    }

    return defaultScroll?.call(router, to, from, savedPosition)
  }

  router.beforeEach((to, from) => {
    if (to.hash && to.fullPath !== from.fullPath) {
      nextTick(() => {
        scrollTo(document.body, to.hash, {
          smooth: true,
        })
      })
    }
  })
}
