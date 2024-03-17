import type { Router } from 'vue-router'
import { nextTick } from 'vue'
import { scrollTo } from 'valaxy'

export function toScrollPosition(router: Router, sakura: any) {
  router.afterEach((to, from) => {
    const savedPosition = sakura.getScrollPosition(to.path)

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
