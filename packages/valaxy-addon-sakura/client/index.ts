import { computed } from 'vue'
import type { ValaxyAddon } from 'valaxy'
import { useRuntimeConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-sakura'
import type { SakuraOption } from '../types'

export function useSakuraThemeConfig<T = ThemeConfig>(cur: string) {
  const runtimeConfig = useRuntimeConfig()

  return computed<T>(() => {
    const options = (runtimeConfig.value.addons['valaxy-addon-sakura'] as ValaxyAddon<SakuraOption>).options

    return (
      options?.configs?.find(({ name }) => name === cur)?.themeConfig
      || options?.configs?.find(({ name }) => name === 'default')?.themeConfig
    ) as T
  })
}
