import { defineAppSetup, scrollTo } from 'valaxy'
import { nextTick } from 'vue'
import { useSakuraAppStore } from '../stores/app'

export default defineAppSetup((_ctx) => {
  const { router, isClient } = _ctx
  if (!isClient)
    return

  router.afterEach((to, from) => {
    const sakura = useSakuraAppStore()
    const savedPosition = sakura.getScrollPosition(to.path)

    // No matter how long the delay set by setTimeout is, it will always execute after nextTick
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays
    // https://github.com/vuejs/router/blob/f06f8a8d14355ed7abed3c37d1d6c4bda833f7c7/packages/router/src/router.ts#L1176
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
})
