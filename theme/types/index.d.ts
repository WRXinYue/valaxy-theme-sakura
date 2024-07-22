import type { DefaultTheme } from 'valaxy'
import type { HitokotoOptions } from 'valaxy-addon-hitokoto'

export namespace SakuraTheme {
  export type Config = ThemeConfig
}

/**
 * Theme Config
 */
export interface ThemeConfig extends DefaultTheme.Config {
  colors: {
    /**
     * primary color
     * @default '#0078E7'
     */
    primary: string
  }

  /**
   * footer
   */
  footer: Footer

  // ============== Valaxy Theme Sakura Config ==============

  banner: Banner

  articlePinned: {
    title?: string
    desc?: string
    img?: string
    link?: string
  }[]

  /**
   * Sidebar
   */
  sidebar: NavItem[] | SidebarMulti
  sidebarOptions: Partial<SidebarOptions>

  /**
   * Navbar
   */
  favicon: boolean
  navbar: NavItem[]
  navbarTitle: string | string[]
  navbarOptions: {
    title?: string | string[]
    invert?: boolean
    col?: boolean
    autoHide?: boolean
    animIn?: string
    animOut?: string
  }

  /**
   * Article
   */
  article: {
    navigationMerge?: boolean
  }

  outlineTitle: string

  // Pagination configuration
  pagination: {
    /**
     * Animations are valid only for the 'infinite-scroll' type
     */
    animation?: boolean

    /**
     * Items per page - applicable for 'pagination' type.
     * Specifies how many items/articles to show per page.
     * Default is siteConfig.pageSize configuration
     */
    itemsPerPage?: number

    /**
     * Optional settings for 'infinite-scroll' type, like threshold for loading more.
     */
    infiniteScrollOptions?: {
      /**
       * Enable preloading of content before the user actually reaches the end.
       * This can improve user experience by having the next content ready in advance.
       */
      preload?: boolean

      /**
       * Set threshold for loading new items, based on pixels before end of current items
       */
      threshold?: number
    }
  }

  scrollDamping: boolean

  notFoundImage: string

  notice: {
    message: string
  }
}

export interface Banner {
  title?: string
  motto?: string
  urls?: string[] | string
  style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''

  /**
   * @zh 是否启用打字机组件
   * @en Whether to enable the typewriter component
   * @default false
   */
  typewriter?: boolean

  hitokoto?: HitokotoOptions
}

export type SidebarMulti = (string | SidebarItem)[]

// export interface SidebarMulti {
//   [path: string]: SidebarItem[] | { items: SidebarItem[], base: string }
// }

export interface SidebarItem {
  /**
   * The text label of the item.
   */
  text?: string

  icon?: string

  /**
   * The link of the item.
   */
  link?: string

  /**
   * The children of the item.
   */
  items?: SidebarItem[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean

  /**
   * Base path for the children items.
   */
  base?: string

  /**
   * Customize text that appears on the footer of previous/next page.
   */
  docFooterText?: string

  rel?: string
  target?: string
}

export interface NavItem {
  text?: string
  locale?: string | number
  link: string
  icon?: string
  submenu?: NavItem[]
}

export interface Footer {
  /**
   * 建站于
   */
  since?: number

  /**
   * Icon between year and copyright info.
   */
  icon?: {
    /**
     * icon name, i-xxx
     */
    enable?: boolean
    name?: string
    img?: string
    animated?: boolean
    url?: string
    title?: string
  }

  /**
   * Powered by valaxy & valaxy-theme-${name}, default is yun
   */
  powered?: boolean

  /** 备案 ICP */
  icp?: string
}

export interface LinkType {
  avatar: string
  name: string
  url: string
  color: string
  blog: string
  desc: string
  rss: string
}

export interface SidebarOptions {
  /**
   * @zh 用来决定侧边栏显示位置
   * @en Determines the display position of the sidebar
   */
  position: 'left' | 'right'

  /**
   * @zh 侧边栏开启是否进行布局偏移
   * @en Indicates whether the layout should offset when the sidebar is open
   * @default true
   */
  offset: boolean

  /**
   * @zh 控制侧边栏默认状态是开启还是关闭
   * @en Controls whether the sidebar is open or closed by default
   * @default false
   */
  initialState: boolean

  /**
   * @zh 侧边栏开启或关闭状态持久化方式
   * @en Persist the open or closed state of the sidebar
   * @default 'session'
   */
  persistence: 'session' | 'permanent' | null

  /**
   * @zh 是否在PC端启用侧边栏
   * @en Indicates whether the sidebar is enabled on the desktop
   * @default false
   */
  enableOnDesktop: boolean
}

export type ThemeUserConfig = Partial<ThemeConfig>
export type UserThemeConfig = ThemeUserConfig
