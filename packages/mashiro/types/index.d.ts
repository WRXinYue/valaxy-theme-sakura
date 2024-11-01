import type { NavbarOptions, ThemeUserConfig as SakuraThemeUserConfig } from 'valaxy-theme-sakura'

export interface ThemeConfig extends SakuraThemeUserConfig {
  navbarOptions: NavbarOptions & {
    subtitle: string
  }
}

export type ThemeUserConfig = {
  [K in keyof ThemeConfig]?: Partial<ThemeConfig[K]>
}
