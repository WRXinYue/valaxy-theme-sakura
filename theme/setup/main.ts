// import { defineAppSetup, useAppStore } from 'valaxy'
import { defineAppSetup } from 'valaxy'
import { nextTick } from 'vue'
// import { useSakuraAppStore } from '../stores'
import { useThemeConfig } from '../composables'
import { defineSakuraSetup } from './sakuraSetup'

export default defineAppSetup(async (ctx) => {
  const { router, isClient, app } = ctx
  const { toScrollPosition } = await import('../utils/rolling')
  if (!isClient)
    return

  const themeConfig = app.runWithContext(() => useThemeConfig().value)

  // const sakuraAppStore = useSakuraAppStore()
  // const appStore = useAppStore()

  router.afterEach(() => {
    /**
     * router import order
     * @see https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#single-page-applications
     */
    nextTick(() => {
      // if (sakuraAppStore.sidebar.isOpen)
      //   sakuraAppStore.sidebar.close()
    })
  })

  // prevent blocking
  router.isReady().then(() => defineSakuraSetup(themeConfig))

  toScrollPosition(router)
})
