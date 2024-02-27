import { defineAppSetup } from 'valaxy'
import { useSakuraAppStore } from '../stores/app'
import 'animate.css'

export default defineAppSetup(async (_ctx) => {
  const { router, isClient } = _ctx
  if (!isClient)
    return

  const { toScrollPosition } = await import('../utils/rolling')
  const sakura = useSakuraAppStore()

  toScrollPosition(router, sakura)
})
