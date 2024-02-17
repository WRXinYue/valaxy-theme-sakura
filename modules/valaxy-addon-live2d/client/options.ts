import { computed } from 'vue'
import type { ValaxyAddon } from 'valaxy'
import { useRuntimeConfig } from 'valaxy'
import type { Live2dOptions } from '../types'

/**
 * get addon config
 */
export function useAddonLive2d() {
  const runtimeConfig = useRuntimeConfig()
  return computed(() => runtimeConfig.value.addons['valaxy-addon-live2d'] as ValaxyAddon<Live2dOptions>)
}
