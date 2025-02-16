import type { SakuraImageCardProps } from './component'

export interface UI {
  /**
   * @zh 主题的主色调，会覆盖 ThemeExtend 的主题色调
   * @en Primary color of the theme
   * @default '#fe9500'
   */
  primary: string

  pinnedPost: {
    icon: string

    image: Partial<SakuraImageCardProps>
  }

  pageHeader: {
    image: Partial<SakuraImageCardProps>
  }

  postHeader: {
    image: Partial<SakuraImageCardProps>
  }

  postList: {
    icon: string

    image: Partial<SakuraImageCardProps>

    /**
     * Breakpoints from Tailwind V2
     *
     * @see https://tailwindcss.com/docs/breakpoints
     */
    responsive: Partial<ResponsiveBreakpoints>
  }

  notice: {
    icon: string
  }

  links: {
    image: Partial<SakuraImageCardProps>
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

export interface ResponsiveBreakpoints {
  'sm': number
  'md': number
  'lg': number
  'xl': number
  '2xl': number
}

export type UserUI = {
  [K in keyof UI]?: Partial<UI[K]>
}
