export interface Pagination {
  /**
   * 分页类型：'infinite-scroll' 表示滚动加载；'standard' 表示普通分页
   */
  type: 'infinite-scroll' | 'standard'

  /**
   * Animations are valid only for the 'infinite-scroll' type
   */
  animation: boolean

  /**
   * Items per page - applicable for 'pagination' type.
   * Specifies how many items/articles to show per page.
   * Default is siteConfig.pageSize configuration
   */
  itemsPerPage: number

  /**
   * Optional settings for 'infinite-scroll' type, like threshold for loading more.
   */
  infiniteScrollOptions: Partial<{
    /**
     * Enable preloading of content before the user actually reaches the end.
     * This can improve user experience by having the next content ready in advance.
     */
    preload: boolean

    /**
     * Set threshold for loading new items, based on pixels before end of current items
     */
    threshold: number
  }>
}
