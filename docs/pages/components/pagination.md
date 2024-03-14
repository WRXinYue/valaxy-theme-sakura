---
title: Pagination
title_zh-CN: Pagination 分页
toc: true
categories:
  - components
codeHeightLimit: 300
---

## Pagination 分页

```ts
export interface ThemeConfig {
  pagination?: {
    type?: 'infinite-scroll' | 'pagination'
    itemsPerPage?: number
    infiniteScrollOptions?: {
      preload?: boolean
      threshold?: number
    }
  }
}
```

| 名称                      | 默认值                               | 描述                                            |
| ------------------------- | ----------------------------------- | ----------------------------------------------- |
| `pagination.type`         | -                                   | 分页类型: 'infinite-scroll' 或 'pagination'     |
| `pagination.itemsPerPage` | -                                   | 每页项目数 - 适用于 'pagination' 类型           |
| `pagination.infiniteScrollOptions.preload` | -       | 是否在用户实际到达底部之前预加载内容            |
| `pagination.infiniteScrollOptions.threshold` | -     | 触发加载更多内容的阈值(像素)                    |
