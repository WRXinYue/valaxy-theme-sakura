export interface PinnedPost {
  text: string
  entries: Partial<PinnedPostRow>[]
  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean
  /**
   * 自动播放间隔 (ms)
   * @default 3000
   */
  interval?: number
  /**
   * 桌面端显示数量
   * @default 3
   */
  desktopItems?: number
}

export interface PinnedPostRow {
  title: string
  desc: string
  /** Cover for links outside the post layout. Article cards use frontmatter.cover. */
  img: string
  link: string
}
