export namespace StarterTheme {
  export type Config = ThemeConfig
  export type Sidebar = any
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

  // home page
  homeTitle: string
  homeMotto: string

  // navbar favicon
  favicon: boolean

  headerWallpaper: {
    urls: string[]
    backgroundStyle: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  }

  /**
   * sidebar
   */
  sidebar: NavItem[]

  // Pagination configuration
  pagination?: {
    /**
     * Defines the pagination type.
     * 'infinite-scroll' for automatic loading more content on scroll,
     * 'pagination' for traditional page number navigation.
     */
    type?: 'infinite-scroll' | 'pagination'

    /**
     * Items per page - applicable for 'pagination' type.
     * Specifies how many items/articles to show per page.
     */
    itemsPerPage?: number // Optional for 'infinite-scroll'

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
       * Threshold in pixels before the end of the items where new items will be loaded.
       */
      threshold?: number
    }
  }

  scrollDamping?: {
    dampingType: 'default' | 'gasp' | ''
  }

  animation?: boolean
}

export interface NavItem {
  text?: string
  locale?: string | number
  link: string
  icon?: string
}

export type ThemeUserConfig = Partial<ThemeConfig>
