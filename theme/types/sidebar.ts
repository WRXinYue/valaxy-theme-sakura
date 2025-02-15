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
