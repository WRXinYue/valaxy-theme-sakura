import { defineAppSetup, useAppStore } from 'valaxy'
import { nextTick } from 'vue'
import { useSakuraAppStore } from '../stores'

export default defineAppSetup(async (ctx) => {
  const { router, isClient } = ctx
  const appStore = useAppStore()
  const sakuraAppStore = useSakuraAppStore()
  router.afterEach(() => {
    nextTick(() => {
      if (appStore.isMobile)
        sakuraAppStore.leftSidebar.close()
    })
  })

  if (isClient) {
    const { toScrollPosition } = await import('../utils/rolling')
    toScrollPosition(router, sakuraAppStore)
  }
})
