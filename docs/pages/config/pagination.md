---
title: pagination
title_zh-CN: 分页
toc: true
categories:
  - config
codeHeightLimit: 300
---

```ts
export interface ThemeConfig {
  // Pagination configuration
  pagination?: {
    /**
     * Defines the pagination type.
     * 'infinite-scroll' for automatic loading more content on scroll,
     * 'pagination' for traditional page number navigation.
     */
    type?: 'infinite-scroll' | 'pagination'

    /**
     * Items per page - applicable for 'pagination' type.
     * Specifies how many items/articles to show per page.
     */
    itemsPerPage?: number // Optional for 'infinite-scroll'

    /**
     * Optional settings for 'infinite-scroll' type, like threshold for loading more.
     */
    infiniteScrollOptions?: {
      /**
       * Enable preloading of content before the user actually reaches the end.
       * This can improve user experience by having the next content ready in advance.
       */
      preload?: boolean

      /**
       * Threshold in pixels before the end of the items where new items will be loaded.
       */
      threshold?: number
    }
  }
}
```

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| homeTitle  | Hello, sakura | 首页标题 |
| homeMotto  | You got to put the past behind you before you can move on. | 首页标语 (写下愿景也很不错呀) |
