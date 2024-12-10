export interface PinnedPost {
  text: string
  entries: Partial<PinnedPostRow>[]
}

export interface PinnedPostRow {
  title: string
  desc: string
  img: string
  link: string
}
