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

  // site name
  prefixName: string
  siteName: string

  // home page
  homeTitle: string
  homeMotto: string

  // navbar favicon
  favicon: boolean

  headerWallpaper: {
    type: 'image' | 'video'

    imageUrl: string
    videoUrl: string

    backgroundStyle: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  }

  /**
   * navbar
   */
  nav: NavItem[]

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
      img: string
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
}

export interface NavItem {
  text: string
  link: string
  icon?: string
}

export type ThemeUserConfig = Partial<ThemeConfig>
