import { defineValaxyAddon } from 'valaxy'
import pkg from '../package.json'

import type { Live2dOptions } from '../types'

export const addonLive2d = defineValaxyAddon<Live2dOptions>(options => ({
  name: pkg.name,
  enable: true,
  global: options?.global ?? false,
  options,
}))
