import type { DefaultTheme } from 'valaxy'
import type { Banner } from './banner'
import type { NavItem, NavbarOptions } from './navbar'
import type { SidebarMulti, SidebarOptions } from './sidebar'
import type { Footer } from './footer'
import type { Post, PostList, PostPinned } from './article'
import type { Pagination } from './pagination'

export interface ThemeConfig extends DefaultTheme.Config {
  theming?: string
  /**
   * @zh 主题的主色调
   * @en Primary color of the theme
   * @default '#0078E7'
   */
  primaryColor: string
  /**
   * @zh 页脚配置
   * @en Footer configuration
   */
  footer: Footer
  /**
   * @zh 文章配置
   * @en Post configuration
   */
  article?: Post
  articleList?: PostList
  /**
   * @zh 置顶文章
   * @en Pinned articles
   */
  articlePinned?: PostPinned
  /**
   * @zh 横幅配置
   * @en Banner configuration
   */
  banner: Banner
  /**
   * @zh 侧边栏配置
   * @en Sidebar configuration
   */
  sidebar: NavItem[] | SidebarMulti
  /**
   * @zh 侧边栏选项配置
   * @en Sidebar options configuration
   */
  sidebarOptions: SidebarOptions
  /**
   * @zh 是否显示站点图标
   * @en Whether to display the site favicon
   * @default true
   * @deprecated Use navbarOptions.favicon instead
   */
  favicon: boolean
  /**
   * @zh 导航栏
   * @en Navbar
   */
  navbar: NavItem[]
  /**
   * @zh 导航栏标题
   * @en Navbar title
   * @deprecated Use NavbarOptions.title instead
   */
  navbarTitle: string | string[]
  /**
   * @zh 导航栏选项配置
   * @en Navbar options configuration
   */
  navbarOptions: NavbarOptions
  /**
   * @zh 大纲标题
   * @en Outline title
   */
  outlineTitle?: string
  /**
   * @zh 分页配置
   * @en Pagination configuration
   */
  pagination?: Pagination
  /**
   * @zh 滚动阻尼
   * @en Scroll damping
   * @default false
   */
  scrollDamping: boolean
  /**
   * @zh 滚动动画
   * @en Scroll animation
   * @default true
   */
  scrollAnimation: boolean
  /**
   * @default false
   */
  scrollIndicator: boolean
  /**
   * @default true
   */
  scrollLock: boolean
  /**
   * @zh 是否显示滚动到顶部组件，默认为按钮样式
   * @en Whether to display the scroll-to-top component. The default is a button style.
   * @default true
   */
  scrollToTop: boolean | 'button' | 'cord'
  scrollDown: {
    enable: boolean
    icon: string
  }
  /**
   * @zh 404图片
   * @en Image for the 404
   */
  notFoundImage?: string
  /**
   * @zh 公告
   * @en Notice
   */
  notice?: {
    /**
     * @zh 公告信息
     * @en Notice message
     */
    message: string
  }

  tags?: {
    /**
     * @zh 是否开启彩色标签
     * @en Whether to enable rainbow tags
     * @default false
     */
    rainbow?: boolean | string[]
  }

  /**
   * @zh 语言切换按钮图标
   * @en The icon for the language switch button
   */
  toggleLocaleIcon?: string
  /**
   * @zh 主题切换按钮图标（明/暗模式）
   * @en Icon for the light/dark mode toggle button
   */
  toggleThemeIcon?: {
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

export type ThemeUserConfig = {
  [K in keyof ThemeConfig]?: Partial<ThemeConfig[K]>
}
/**
 * @deprecated Use ThemeUserConfig instead
 */
export type UserThemeConfig = ThemeUserConfig
