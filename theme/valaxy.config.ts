import { defineTheme } from 'valaxy'
import { addonVercount } from 'valaxy-addon-vercount'
import { defaultThemeConfig, generateSafelist, themePlugin } from './node'
import type { ThemeConfig } from './types'

export default defineTheme<ThemeConfig>((options) => {
  return {
    themeConfig: defaultThemeConfig,
    vite: {
      plugins: [
        themePlugin(options),
      ],
    },
    unocss: {
      safelist: generateSafelist(options.config.themeConfig as ThemeConfig),
    },
    // markdown: {
    //   wrapperClasses: (id, code) => code.includes('@layout-full-width')
    //     ? ''
    //     : 'prose m-auto slide-enter-content',
    //   headEnabled: true,
    //   exportFrontmatter: false,
    //   exposeFrontmatter: false,
    //   exposeExcerpt: false,
    //   markdownItOptions: {
    //     quotes: '""\'\'',
    //   },
    // },
    addons: [
      addonVercount(),
    ],
  }
})
