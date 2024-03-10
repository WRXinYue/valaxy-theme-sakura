export namespace SakuraTheme {
  export type Config = ThemeConfig
  export type ThemeUserConfig = Partial<ThemeConfig>
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
      animated?: boolean
      url: string
      title: string
    }

    /**
     * Powered by valaxy & valaxy-theme-${name}, default is yun
     */
    powered: boolean

    /** 备案 ICP */
    icp: string
  }>

  // ============== Valaxy Theme Sakura Config ==============

  // navbar favicon
  favicon: boolean

  banner: SakuraTheme.Banner

  startDash?: {
    title?: string
    desc?: string
    img?: string
    link?: string
  }[]

  /**
   * Sidebar
   */
  sidebar: NavItem[] | SidebarMulti
  sidebarPCOptions: {
    enable: string | string[]
    pushMode: string | string[]
    defaultOpen: string | string[]
    hamburger: string | string[]
  }
  sidebarMobileOptions: {
    pushMode: string | string[]
    hamburger: string | string[]
  }

  /**
   * Navbar
   */
  navbar: NavItem[]
  navbarTitle: string | string[]

  /**
   * Layout
   */
  layout: Layout

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

export interface Banner {
  enable?: boolean
  title?: string
  motto?: string
  urls: string[]
  style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  overlayBar?: boolean
}

export interface SidebarMulti {
  [path: string]
  // [path: string]: SidebarItem[] | { items: SidebarItem[], base: string }
}

export interface NavItem {
  text?: string
  locale?: string | number
  link: string
  icon?: string
  isExternal?: boolean
  submenu?: NavItem[]
}

export interface Layout {
  nav?: 'left-top' | 'top-left'
  sidebar: 'overview' | 'dynamic'
}
