import type { ThemeConfig } from 'valaxy-theme-sakura'

export interface SakuraOption {
  /**
   * 可以动态切换的 config
   */
  configs: SakuraConfig[]
}

export interface SakuraConfig {
  name: string
  themeConfig: ThemeConfig
}
