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
  items?: NavItem[]
}

export interface NavbarOptions {
  /**
   * @zh 是否显示站点图标
   * @en Whether to display the site favicon
   * @default true
   */
  favicon: boolean
  /**
   * @zh 导航栏的标题，可以是字符串或字符串数组
   * @en The title of the navbar, can be a string or an array of strings
   */
  title: string | string[]
  subTitle: string
  /**
   * @zh 是否反转导航栏
   * @en Whether to invert the navbar
   * @default false
   */
  invert: boolean | string | string[]
  /**
   * @default true
   */
  enableHover: boolean
  /**
   * @zh 是否自动隐藏导航栏
   * @en Whether to auto-hide the navbar
   * @default false
   */
  autoHide: boolean | string | string[]
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
  /**
   * @default 100
   */
  offset: number
  /**
   * @zh 导航栏的工具按钮
   * @en Tool buttons to include in the navbar, like search or settings
   * @default ['toggleDark', 'search']
   */
  tools: ('toggleLocale' | 'toggleDark' | 'search')[]
  /**
   * @zh 导航栏汉堡按钮的样式。
   * - 'uneven': 具有一条不一样长的样式
   * - 'old': 三条长度相同的经典样式
   * @en The style of the hamburger button in the navigation bar
   * - 'uneven': A style where one line is different in length
   * - 'old': The classic style with three equal-length lines
   * @default 'uneven'
   */
  hamburgerStyle: 'uneven' | 'old'
}
