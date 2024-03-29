---
title: Pagination
title_zh-CN: Pagination 分页
toc: true
categories:
  - components
codeHeightLimit: 300
---

## Pagination 分页

### 自定义插槽

`<SakuraPaginationCustom />`

```vue
<template>
  <PaginationThemeInfiniteScroll />
</template>
```

### 插槽主题

#### PaginationThemeInfiniteScroll

分页方式为滚动

<SakuraArticleListThemeCard />
<PaginationThemeInfiniteScroll />

```ts
export interface ThemeConfig {
  pagination?: {
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
| `pagination.type`         |                                    | 分页类型: 'infinite-scroll' 或 'pagination'     |
| `pagination.itemsPerPage` |                                    | 每页项目数 - 适用于 'pagination' 类型           |
| `pagination.infiniteScrollOptions.preload` |        | 是否在用户实际到达底部之前预加载内容            |
| `pagination.infiniteScrollOptions.threshold` |      | 触发加载更多内容的阈值(像素)                    |

#### PaginationThemeValaxy

Valaxy默认分页组件

<PaginationThemeValaxy  :page-size="3" :total="30"/>

::: warning
Valaxy默认分页组件只支持对 `/page/*` 这种分页方式，所以只能在 Home 布局文章分页使用
:::
