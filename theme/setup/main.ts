import { defineAppSetup, useAppStore } from 'valaxy'
import { nextTick } from 'vue'
import { useSakuraAppStore } from '../stores'

export default defineAppSetup(async (ctx) => {
  const { router, isClient } = ctx

  router.afterEach(() => {
    /**
     * router import order
     * @see https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#single-page-applications
     */
    const appStore = useAppStore()
    const sakuraAppStore = useSakuraAppStore()
    nextTick(() => {
      if (appStore.isMobile)
        sakuraAppStore.leftSidebar.close()
    })
  })

  if (isClient) {
    const sakuraAppStore = useSakuraAppStore()
    const { toScrollPosition } = await import('../utils/rolling')
    toScrollPosition(router, sakuraAppStore)
  }
})
