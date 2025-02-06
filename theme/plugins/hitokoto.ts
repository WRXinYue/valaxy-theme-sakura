import { isEmptyAddon } from 'valaxy'
import * as addonHitokoto from 'valaxy-addon-hitokoto'

if (isEmptyAddon(addonHitokoto))
  console.warn('Please install valaxy-addon-hitokoto')

export default addonHitokoto
