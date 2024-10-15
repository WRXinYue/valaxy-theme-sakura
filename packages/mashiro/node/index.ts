import defu from 'defu'
import type { ThemeConfig } from '../types'

export const defaultThemeConfig: ThemeConfig = {
  banner: {
    waveTheme: 'horizontal',
    style: 'filter-dot',
  },
  navbarOptions: {
    invert: true,
  },
  articleList: {
    icon: 'i-fa-envira',
    text: 'Discovery',
  },
  articlePinned: {
    icon: 'i-fa-anchor',
    text: 'START:DASH!!',
  },
}

export function baseConfig(userThemeConfig?: ThemeConfig) {
  const themeConfig = defu(userThemeConfig || {}, defaultThemeConfig)
  return themeConfig
}
