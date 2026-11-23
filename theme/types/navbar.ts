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
   * @zh a 标签的 target 属性，用于指定链接打开的方式
   * @en The target attribute of the <a> tag, specifying how to open the link
   */
  target?: '_blank' | '_self' | '_parent' | '_top' | ''
}

export interface NavbarOptions {
  /**
   * @zh 是否显示站点图标
   * @en Whether to display the site favicon
   * @default true
   */
  favicon: boolean
  /**
   * @zh 是否显示导航栏标记
   * @en Whether to show the marker on the navbar
   * @default true
   */
  showMarker: boolean
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
   */
  hamburgerStyle?: 'uneven' | 'old'

}
