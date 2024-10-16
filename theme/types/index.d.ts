import type { DefaultTheme } from 'valaxy'
import type { HitokotoOptions } from 'valaxy-addon-hitokoto'

export namespace SakuraTheme {
  export type Config = ThemeConfig
}

/**
 * Theme Config
 */
export interface ThemeConfig extends DefaultTheme.Config {
  theming?: string
  colors: {
    /**
     * @zh 主题的主色调
     * @en Primary color of the theme
     * @default '#0078E7'
     */
    primary: string
  }
  /**
   * @zh 页脚配置
   * @en Footer configuration
   */
  footer: Footer
  /**
   * @zh 文章配置
   * @en Article configuration
   */
  article?: {
    /**
     * @zh 是否合并导航
     * @en Whether to merge navigation
     * @default false
     */
    navigationMerge?: boolean
  }
  articleList?: Partial<ArticleList>
  /**
   * @zh 置顶文章
   * @en Pinned articles
   */
  articlePinned?: Partial<ArticlePinned>
  /**
   * @zh 横幅配置
   * @en Banner configuration
   */
  banner: Partial<Banner>
  /**
   * @zh 侧边栏配置
   * @en Sidebar configuration
   */
  sidebar: NavItem[] | SidebarMulti
  /**
   * @zh 侧边栏选项配置
   * @en Sidebar options configuration
   */
  sidebarOptions: Partial<SidebarOptions>
  /**
   * @zh 是否显示站点图标
   * @en Whether to display the site favicon
   * @default true
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
  navbarOptions?: Partial<NavbarOptions>
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
   * @zh 是否显示滚动到顶部组件，默认为按钮样式
   * @en Whether to display the scroll-to-top component. The default is a button style.
   * @default true
   */
  scrollToTop: boolean | 'button' | 'cord'
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

  // Layout

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
  translateIcon?: string
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
  /**
   * @zh 启用一言，如果启用则 `motto` 显示为一言
   * @en Enable Hitokoto, if enabled, `motto` will display as Hitokoto
   * @default false
   */
  enableHitokoto?: boolean
  /**
   * @zh 一言的配置选项
   * @en Hitokoto configuration options
   */
  hitokoto?: HitokotoOptions
  /**
   * @zh 背景波纹主题
   * @en Background wave theme
   * @default undefined
   */
  waveTheme?: 'fish' | 'horizontal' | 'ripple' | 'yunCloud'
  /**
   * @zh 自定义视频, 可以放PV MV之类的
   * @en Custom Video
   */
  playerUrl?: string
  /**
   * @zh 是否禁用画中画功能
   * @en Whether to disable picture-in-picture feature
   * @default undefined
   */
  disablePictureInPicture?: boolean
}

export interface NavbarOptions {
  /**
   * @zh 导航栏的标题，可以是字符串或字符串数组
   * @en The title of the navbar, can be a string or an array of strings
   */
  title: string | string[]
  /**
   * @zh 是否反转导航栏
   * @en Whether to invert the navbar
   * @default false
   */
  invert: boolean
  /**
   * @zh 是否自动隐藏导航栏
   * @en Whether to auto-hide the navbar
   * @default false
   */
  autoHide: boolean
  /**
   * @zh 导航栏显示的动画效果
   * @en The animation effect when the navbar appears
   */
  animIn: string
  /**
   * @zh 导航栏隐藏的动画效果
   * @en The animation effect when the navbar disappears
   */
  animOut: string
  /**
   * @zh 是否显示导航栏标记
   * @en Whether to show the marker on the navbar
   * @default false
   */
  showMarker: boolean
  activeHeader: Partial<{
  /**
   * @default true
   */
    enableHover: boolean
  }>
}

export type SidebarMulti = (string | SidebarItem)[]

// export interface SidebarMulti {
//   [path: string]: SidebarItem[] | { items: SidebarItem[], base: string }
// }

export interface SidebarItem {
  /**
   * @zh 侧边栏文本标签
   * @en The text label of the item
   */
  text?: string
  /**
   * @zh i18n 国际化
   * @en i18n localization
   */
  locale?: string | number
  /**
   * @zh 侧边栏图标
   * @en The icon of the item
   */
  icon?: string
  /**
   * @zh 侧边栏链接
   * @en The link of the item
   */
  link?: string
  /**
   * @zh 侧边栏子列表
   * @en The children of the item
   */
  items?: SidebarItem[]
  /**
   * @zh 是否可折叠及折叠状态
   * @en If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default.
   *
   * If `false`, group is collapsible but expanded by default.
   */
  collapsed?: boolean
  /**
   * @zh 侧边栏子列表的基础路径
   * @en Base path for the children items
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
  /**
   * @zh 文本
   * @en Text
   */
  text?: string
  /**
   * @zh i18n 国际化
   * @en i18n localization
   */
  locale?: string | number
  /**
   * @zh 链接
   * @en Link
   */
  link: string
  /**
   * @zh 图标
   * @en Icon
   */
  icon?: string
  /**
   * @zh 图标动画
   * @en Icon animation
   */
  animated?: string
  /**
   * @zh a 标签的 target 属性，用于指定链接打开的方式
   * @en The target attribute of the <a> tag, specifying how to open the link
   */
  target?: '_blank' | '_self' | '_parent' | '_top' | ''
  /**
   * @zh 子菜单项
   * @en Submenu Items
   */
  children?: NavItem[]
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

  /**
   * @zh 是否显示计数器
   * @default false
   */
  showCounts: boolean
}

export interface Pagination {
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

export interface ArticleListCard {
  isImageReversed: boolean
  defaultImage: string
}

export interface ArticleListGrid {
}

export interface ArticleListMasonry {
}

export interface ArticleList {
  icon: string
  text: string
  mode: 'card' | 'grid' | 'masonry'

  settings: {
    card?: ArticleListCard
    grid?: ArticleListGrid
    masonry?: ArticleListMasonry
  }
}

export interface ArticlePinned {
  icon: string
  text: string
  entries: Partial<ArticlePinnedRow>[]
}

export interface ArticlePinnedRow {
  title: string
  desc: string
  img: string
  link: string
}

export type ThemeUserConfig = Partial<ThemeConfig>
/**
 * @deprecated Use ThemeUserConfig instead
 */
export type UserThemeConfig = ThemeUserConfig
