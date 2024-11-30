import type { ThemeUserConfig } from './index'

export interface Theme {
  /**
   * @zh 默认启动的主题名称
   * @en Name of the default theme to start with
   */
  default: string
  /**
   * @zh 主题的主色调，会覆盖 ThemeExtend 的主题色调
   * @en Primary color of the theme
   * @default '#0078E7'
   */
  primary: string
  /**
   * @zh 全局预设，如果设置将会覆盖 ThemeExtend 预设
   * @en
   */
  preset: ThemeUserConfig
  extends: ThemeExtend[]
}

export interface ThemeExtend {
  /**
   * @zh 主题名
   */
  name: string
  /**
   * @zh 主题的主色调
   * @en Primary color of the theme
   * @default '#0078E7'
   */
  primary?: string
  preset?: ThemeUserConfig
  // components?: Record<string, () => Promise<Component>>
}
