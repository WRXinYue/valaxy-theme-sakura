import { defineAppSetup } from 'valaxy'
import { useSakuraAppStore } from '../stores/app'

export default defineAppSetup(async (_ctx) => {
  const { router, isClient } = _ctx
  if (!isClient)
    return

  const { toScrollPosition } = await import('../utils/rolling')
  const sakura = useSakuraAppStore()

  toScrollPosition(router, sakura)
})
