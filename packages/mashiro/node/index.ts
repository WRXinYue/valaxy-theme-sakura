import defu from 'defu'
import type { ThemeConfig } from '../types'

export const defaultThemeConfig: ThemeConfig = {
  primaryColor: '#fe9500',

  banner: {
    waveTheme: 'horizontal',
    style: 'filter-dot',
    fixedImg: true,
  },
  navbarOptions: {
    invert: true,
    showMarker: false,
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
    infiniteScrollOptions: { preload: false },
  },

  scrollIndicator: true,
  scrollDown: {
    icon: 'i-fa-chevron-down',
  },
}

export function baseConfig(userThemeConfig?: ThemeConfig) {
  const themeConfig = defu(userThemeConfig || {}, defaultThemeConfig)
  return themeConfig
}
