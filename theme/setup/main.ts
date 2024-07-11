import { defineAppSetup, useAppStore } from 'valaxy'
import { nextTick } from 'vue'
import { useSakuraAppStore } from '../stores'

export default defineAppSetup(async (ctx) => {
  const { router, isClient } = ctx
  if (!isClient)
    return

  const { toScrollPosition } = await import('../utils/rolling')

  const sakuraAppStore = useSakuraAppStore()
  const appStore = useAppStore()

  router.afterEach(() => {
    /**
     * router import order
     * @see https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#single-page-applications
     */
    nextTick(() => {
      if (appStore.isMobile)
        sakuraAppStore.leftSidebar.close()
    })
  })

  toScrollPosition(router)
})
