export interface PostList {
  text: string
  isImageReversed: boolean
  /**
   * string 数组随机选择
   */
  defaultImage: string | string[]

  /**
   * Breakpoints from Tailwind V2
   *
   * @see https://tailwindcss.com/docs/breakpoints
   */
  responsive?: Partial<ResponsiveBreakpoints>

  /**
   * @zh 是否开启元数据截断（平均隐藏分类和标签）
   * @en Whether to enable metadata truncation (evenly hide categories and tags)
   * @default true
   */
  truncateMeta?: boolean
}

export interface PostFooter {
  /**
   * @zh 是否合并导航
   * @en Whether to merge navigation
   * @default false
   */
  navigationMerge?: boolean
}

export interface ResponsiveBreakpoints {
  'sm': number
  'md': number
  'lg': number
  'xl': number
  '2xl': number
}
