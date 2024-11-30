import { defineTheme } from 'valaxy'
import { addonVercount } from 'valaxy-addon-vercount'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import type { SakuraConfig } from 'valaxy-addon-sakura'
import { addonSakura } from 'valaxy-addon-sakura'
import defu from 'defu'
import { generateSafelist, defaultThemeConfig as sakuraDefaultThemeConfig, themePlugin } from './node'
import type { Hero, ThemeConfig, ThemeUserConfig } from './types'

export default defineTheme<ThemeUserConfig>((options) => {
  const { themeConfig: userThemeConfig, siteConfig } = options.config
  const defaultThemeConfig = defu(userThemeConfig.theme?.preset, sakuraDefaultThemeConfig) as ThemeConfig
  const themeConfig = defu(userThemeConfig, defaultThemeConfig) as ThemeConfig

  if (siteConfig.search?.enable && !userThemeConfig.navbarOptions?.tools?.includes('search'))
    defaultThemeConfig.navbarOptions.tools.push('search')

  if (userThemeConfig.navbarOptions?.tools)
    defaultThemeConfig.navbarOptions.tools = []

  if (userThemeConfig.banner)
    defaultThemeConfig.hero = { ...userThemeConfig.banner, ...userThemeConfig.hero } as Hero

  const configs: SakuraConfig[] = []

  configs.push({
    name: 'default',
    themeConfig,
  })

  themeConfig.theme?.extends?.forEach(({ name, preset }) => {
    const config = defu(userThemeConfig, preset, defaultThemeConfig) as ThemeConfig

    configs.push({
      name,
      themeConfig: config,
    })
  })

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
      addonSakura({ configs }),
    ],
    fuse: {
      extendKeys: ['cover', 'date'],
    },
  }
})
