import { defineAppSetup } from 'valaxy'
import { toScrollPosition } from '../utils/rolling'
import 'animate.css'

export default defineAppSetup((_ctx) => {
  const { router, isClient } = _ctx
  if (!isClient)
    return

  toScrollPosition(router)
})
