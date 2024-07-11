import type { Router } from 'vue-router'
import { nextTick } from 'vue'
import { scrollTo } from 'valaxy'
import { useSakuraAppStore } from '../stores'

const sakuraAppStore = useSakuraAppStore()

export function toScrollPosition(router: Router) {
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
