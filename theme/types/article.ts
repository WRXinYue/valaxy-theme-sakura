export interface Post {
  /**
   * @zh 是否合并导航
   * @en Whether to merge navigation
   * @default false
   */
  navigationMerge?: boolean
}

export interface PostListCard {
  isImageReversed: boolean
  defaultImage: string
}

export interface PostListGrid {
}

export interface PostListMasonry {
}

export interface PostList {
  icon: string
  text: string
  mode: 'card' | 'grid' | 'masonry'

  settings: {
    card?: PostListCard
    grid?: PostListGrid
    masonry?: PostListMasonry
  }
}

export interface PostPinned {
  icon: string
  text: string
  entries: Partial<PostPinnedRow>[]
}

export interface PostPinnedRow {
  title: string
  desc: string
  img: string
  link: string
}
