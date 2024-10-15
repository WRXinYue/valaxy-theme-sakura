import { defineTheme } from 'valaxy'
import { addonVercount } from 'valaxy-addon-vercount'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import defu from 'defu'
import { SakuraStyleResolver, defaultThemeConfig, generateSafelist, themePlugin } from './node'
import type { ThemeConfig } from './types'

export default defineTheme<ThemeConfig>((options) => {
  const { themeConfig: userThemeConfig } = options.config
  const themeConfig = defu(userThemeConfig || {}, defaultThemeConfig)

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
  }
})
