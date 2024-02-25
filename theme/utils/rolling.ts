import type { Router } from 'vue-router'
import { nextTick } from 'vue'
import { scrollTo } from 'valaxy'
import { useSakuraAppStore } from '../stores/app'

export function toScrollPosition(router: Router) {
  router.afterEach((to, from) => {
    const sakura = useSakuraAppStore()
    const savedPosition = sakura.getScrollPosition(to.path)

    if (to.fullPath !== from.fullPath) {
      setTimeout(() => {
        document.documentElement.scrollTop = savedPosition
      }, 0)
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
