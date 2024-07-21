// import { defineAppSetup, useAppStore } from 'valaxy'
import { defineAppSetup } from 'valaxy'
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

  // router.afterEach((to, from, next) => {
  //   /**
  //    * router import order
  //    * @see https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#single-page-applications
  //    */
  //   nextTick(() => {
  //     // to.meta.hideRouterView
  //     // if (sakuraAppStore.sidebar.isOpen)
  //     //   sakuraAppStore.sidebar.close()
  //   })
  // })

  // router.beforeEach((to, from, next) => {
  //   next(false)
  // })

  // prevent blocking
  router.isReady().then(() => defineSakuraSetup(themeConfig))

  toScrollPosition(router)
})
