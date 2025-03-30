import defu from 'defu'
import { defineTheme } from 'valaxy'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import { addonVercount } from 'valaxy-addon-vercount'
import type { Hero, ThemeConfig, ThemeUserConfig } from './types'
import { generateSafelist, defaultThemeConfig as sakuraDefaultThemeConfig, themePlugin } from './node'

export default defineTheme<ThemeUserConfig>((options) => {
  const { themeConfig: userThemeConfig, siteConfig } = options.config
  const defaultThemeConfig = sakuraDefaultThemeConfig as ThemeConfig
  const themeConfig = defu(userThemeConfig, defaultThemeConfig) as ThemeConfig

  if (siteConfig.search?.enable && !userThemeConfig.navbarOptions?.tools?.includes('search'))
    defaultThemeConfig.navbarOptions.tools.push('search')

  if (userThemeConfig.navbarOptions?.tools)
    defaultThemeConfig.navbarOptions.tools = []

  if (userThemeConfig.banner)
    defaultThemeConfig.hero = { ...userThemeConfig.banner, ...userThemeConfig.hero } as Hero

  return {
    themeConfig: defaultThemeConfig,

    vite: {
      plugins: [
        themePlugin(themeConfig),
      ],
      optimizeDeps: {
        include: ['interactjs'],
      },
    },
    unocss: {
      safelist: generateSafelist(themeConfig),
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
