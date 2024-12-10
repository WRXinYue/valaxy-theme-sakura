import type { PluginOption } from 'vite'
import type { ThemeConfig } from '../types'

export function themePlugin(themeConfig: ThemeConfig): PluginOption {
  return {
    name: 'valaxy-theme-sakura',

    config() {
      const primaryColor = themeConfig.ui.primary

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
