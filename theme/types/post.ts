export interface PostList {
  text: string
  isImageReversed: boolean
  /**
   * string 数组随机选择
   */
  defaultImage: string | string[]
}

export interface PostFooter {
  /**
   * @zh 是否合并导航
   * @en Whether to merge navigation
   * @default false
   */
  navigationMerge?: boolean
}
