import { defineValaxyAddon } from 'valaxy'
import pkg from '../package.json'
import type { SakuraOption } from '../types'

export const addonSakura = defineValaxyAddon<SakuraOption>(options => ({
  name: pkg.name,
  enable: true,
  options,
}))
