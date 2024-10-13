import type { ThemeUserConfig } from 'valaxy-theme-sakura'
import defu from 'defu'

export const defaultThemeConfig: ThemeUserConfig = {
  navbarOptions: {
    activeHeader: {
      enableHover: false,
    },
  },
}

export function baseConfig<T>(userThemeConfig?: T) {
  const themeConfig = defu(userThemeConfig || {}, defaultThemeConfig)
  return themeConfig
}
