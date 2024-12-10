export interface UI {
  /**
   * @zh 主题的主色调，会覆盖 ThemeExtend 的主题色调
   * @en Primary color of the theme
   * @default '#fe9500'
   */
  primary: string

  pinnedPost: {
    icon: string
  }

  postList: {
    icon: string
  }

  notice: {
    icon: string
  }

  scrollDown: {
    icon: string
  }

  toggleLocaleButton: {
    icon: string
  }

  /**
   * @zh 主题切换按钮图标（明/暗模式）
   * @en Icon for the light/dark mode toggle button
   */
  toggleDarkButton?: {
    /**
     * @zh 暗模式图标
     * @en Dark mode icon
     */
    darkIcon?: string
    /**
     * @zh 亮模式图标
     * @en Light mode icon
     */
    lightIcon?: string
  }
}
