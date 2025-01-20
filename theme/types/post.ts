export interface PostList {
  text: string
  isImageReversed: boolean
  /**
   * true 默认使用 notFoundImage， false 不显示默认图片， string 数组随机选择
   */
  defaultImage: string | string[] | boolean
}

export interface PostFooter {
  /**
   * @zh 是否合并导航
   * @en Whether to merge navigation
   * @default false
   */
  navigationMerge?: boolean
}
