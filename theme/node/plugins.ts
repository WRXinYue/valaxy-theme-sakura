import type { PluginOption } from 'vite'
import type { ThemeConfig } from '../types'

export function themePlugin(themeConfig: ThemeConfig): PluginOption {
  return {
    name: 'valaxy-theme-sakura',

    config() {
      let primaryColor: string = themeConfig.theme!.primary

      if (themeConfig.theme?.default) {
        themeConfig.theme.extends.forEach(({ name, primary }) => {
          if (name === themeConfig.theme?.default && primary)
            primaryColor = primary
        })
      }

      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${primaryColor} !default;`,
            },
          },
        },

        valaxy: {},
      }
    },
  }
}
