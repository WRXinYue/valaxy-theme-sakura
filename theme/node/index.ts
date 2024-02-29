import type { Plugin } from 'vite'
import type { ResolvedValaxyOptions } from 'valaxy'
import type { ThemeConfig } from '../types'

/**
 * Default Config
 */
export const defaultThemeConfig: ThemeConfig = {
  // colors: {
  //   primary: '#e67474',
  // },

  prefixName: 'かなしいの',
  siteName: '心悦',

  homeTitle: 'Hello, sakura',
  homeMotto: 'You got to put the past behind you before you can move on.',

  favicon: false,

  headerWallpaper: {
    urls: [],
    backgroundStyle: 'filter-dot',
  },

  nav: [],
  sidebar: [],

  animation: false,

  footer: {
    since: 2024,
    icon: {
      animated: true,
      url: 'https://sponsors.yunyoujun.cn',
      title: 'WRXinYue',
    },

    powered: true,

    beian: {
      enable: false,
      icp: '',
    },
  },
}

// write a vite plugin
// https://vitejs.dev/guide/api-plugin.html
export function themePlugin(
  options: ResolvedValaxyOptions<ThemeConfig>,
): Plugin {
  const themeConfig = options.config.themeConfig || {}

  return {
    name: 'valaxy-theme-sakura',

    config() {
      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${
                themeConfig.colors?.primary || '#e67474'
              } !default;`,
            },
          },
        },

        valaxy: {},
      }
    },
  }
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const safelist: string[] = []

  const footerIcon = themeConfig.footer?.icon?.img

  footerIcon && safelist.push(footerIcon)

  themeConfig.nav?.forEach((navItem) => {
    navItem?.icon && safelist.push(navItem.icon)
  })

  themeConfig.sidebar?.forEach((sidebarItem) => {
    sidebarItem?.icon && safelist.push(sidebarItem.icon)
  })

  return safelist
}
