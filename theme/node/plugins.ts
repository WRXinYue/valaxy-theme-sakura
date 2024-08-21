import type { PluginOption } from 'vite'
import type { ThemeConfig } from '../types'

export function themePlugin(themeConfig: ThemeConfig): PluginOption {
  return {
    name: 'valaxy-theme-sakura',

    config() {
      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${themeConfig.colors?.primary} !default;`,
            },
          },
        },

        valaxy: {},
      }
    },
  }
}
