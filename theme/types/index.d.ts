export namespace SakuraTheme {
  export type Config = ThemeConfig
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
  footer: Footer

  // ============== Valaxy Theme Sakura Config ==============

  // navbar favicon
  favicon: boolean

  banner: Banner

  articlePinned?: {
    title?: string
    desc?: string
    img?: string
    link?: string
  }[]

  /**
   * Sidebar
   */
  sidebar: NavItem[] | SidebarMulti

  /**
   * Navbar
   */
  navbar: NavItem[]
  navbarTitle: string | string[]

  /**
   * Article
   */
  article?: {
    navigationMerge?: boolean
  }

  outlineTitle?: string

  // Pagination configuration
  pagination?: {
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
}

export interface Banner {
  title?: string
  motto?: string
  urls: string[] | string
  style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
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
  isExternal?: boolean
  submenu?: NavItem[]
}

export type ThemeUserConfig = Partial<ThemeConfig>

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
