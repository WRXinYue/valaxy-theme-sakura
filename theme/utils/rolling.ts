import type { Router } from 'vue-router'
import { scrollTo } from 'valaxy'
import { nextTick } from 'vue'
import { useSakuraAppStore } from '../stores'

export function toScrollPosition(router: Router) {
  const sakuraAppStore = useSakuraAppStore()

  router.afterEach((to, from) => {
    const savedPosition = sakuraAppStore.getScrollPosition(to.path)

    if (to.fullPath !== from.fullPath && !to.hash) {
      nextTick(() => {
        setTimeout(() => {
          document.documentElement.scrollTop = savedPosition
        }, 0)
      })
    }
  })

  router.beforeEach((to, from) => {
    if (to.fullPath !== from.fullPath) {
      nextTick(() => {
        scrollTo(document.body, to.hash, {
          smooth: true,
        })
      })
    }
  })
}
