import { defineTheme } from 'valaxy'
import { addonVercount } from 'valaxy-addon-vercount'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import defu from 'defu'
import { SakuraStyleResolver, defaultThemeConfig, generateSafelist, themePlugin } from './node'
import type { ThemeConfig, ThemeUserConfig } from './types'

export default defineTheme<ThemeUserConfig>((options) => {
  const { themeConfig: userThemeConfig } = options.config
  const themeConfig = defu(userThemeConfig || {}, defaultThemeConfig) as ThemeConfig

  return {
    themeConfig: defaultThemeConfig,
    vite: {
      plugins: [
        themePlugin(themeConfig),
      ],
    },
    unocss: {
      safelist: generateSafelist(themeConfig),
    },
    components: {
      resolvers: [SakuraStyleResolver(themeConfig)],
    },
    addons: [
      addonVercount(),
      addonHitokoto(),
    ],
    fuse: {
      extendKeys: ['cover', 'date'],
    },
  }
})
