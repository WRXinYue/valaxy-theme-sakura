import defu from 'defu'
import type { ThemeUserConfig } from '../types'

export const defaultThemeConfig: ThemeUserConfig = {
  primaryColor: '#fe9500',

  article: {
    navigationMerge: true,
  },
  banner: {
    waveTheme: 'horizontal',
    style: 'filter-dot',
    fixedImg: true,
  },
  navbarOptions: {
    offset: 0,
    invert: ['home'],
    showMarker: false,
    autoHide: ['home'],
    tools: ['toggleTheme', 'search'],
  },
  articleList: {
    icon: 'i-fa-envira',
    text: 'Discovery',

    settings: {
      card: {
        isImageReversed: true,
        defaultImage: 'https://img.xjh.me/random_img.php?type=bg&return=302',
      },
    },
  },
  articlePinned: {
    icon: 'i-fa-anchor',
    text: 'START:DASH!!',
  },

  pagination: {
    animation: true,
    infiniteScrollOptions: { preload: false },
  },

  scrollIndicator: true,
  scrollLock: false,
  scrollDown: {
    icon: 'i-fa-chevron-down',
  },
}

export function baseConfig(userThemeConfig?: ThemeUserConfig) {
  const themeConfig = defu(userThemeConfig || {}, defaultThemeConfig)
  return themeConfig
}
