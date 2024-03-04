export namespace SakuraTheme {
  export type Config = ThemeConfig
  export type Sidebar = any

  export interface Banner {
    enable?: boolean
    title?: string | string[]
    motto?: string
    urls: string[]
    style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
    overlayBar?: boolean
  }

  export interface SidebarMulti {
    [path: string]: SidebarItem[] | { items: SidebarItem[], base: string }
  }
}

/**
 * Theme Config
 */
export interface ThemeConfig {
  colors?: {
    /**
     * primary color
     * @default '#e67474'
     */
    primary: string
  }

  /**
   * footer
   */
  footer: Partial<{
    /**
     * 建站于
     */
    since: number

    /**
     * Icon between year and copyright info.
     */
    icon: {
      /**
       * icon name, i-xxx
       */
      enable?: boolean
      name?: string
      img?: string
      animated: boolean
      url: string
      title: string
    }

    /**
     * Powered by valaxy & valaxy-theme-${name}, default is yun
     */
    powered: boolean

    /**
     * Chinese Users | 中国用户
     * 备案 ICP
     * 国内用户需要在网站页脚展示备案 ICP 号
     * https://beian.miit.gov.cn/
     */
    beian: {
      enable: boolean
      /**
       * 苏ICP备xxxxxxxx号
       */
      icp: string
    }
  }>

  /**
   * navbar
   */
  nav: NavItem[]

  // ============== Valaxy Theme Sakura Config ==============

  // site name
  prefixName: string
  siteName: string

  // navbar favicon
  favicon: boolean

  banner: SakuraTheme.Banner

  /**
   * sidebar
   */
  sidebar: NavItem[] | SidebarMulti
  sidebarPushMode: boolean | string | string[]
  sidebarShowOnPC: boolean | string | string[]
  sidebarDefaultOpen: boolean | string | string[]

  // Pagination configuration
  pagination?: {
    /**
     * Defines the pagination type.
     * 'infinite-scroll' for automatic loading more content on scroll,
     * 'pagination' for traditional page number navigation.
     */
    type?: 'infinite-scroll' | 'pagination'

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

  scrollDamping?: boolean

  animation?: boolean

  showBackToTop?: boolean
}

export interface NavItem {
  text?: string
  locale?: string | number
  link: string
  icon?: string
  isExternal: boolean
  submenu: NavItem[]
}

export type ThemeUserConfig = Partial<ThemeConfig>
