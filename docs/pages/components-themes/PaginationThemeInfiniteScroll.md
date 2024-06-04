---
title: PaginationThemeInfiniteScroll
title_zh-CN: PaginationThemeInfiniteScroll
toc: true
categories:
  - components-themes
---

## PaginationThemeInfiniteScroll

需要配合其他组件使用如文章列表，使用直接插入组件即可无需其他配置

## 预览

<PaginationThemeInfiniteScrollPG />

## API

### ThemeConfig

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

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| pagination.itemsPerPage | --- | 每页项目数 - 适用于 'pagination' 类型 |
| pagination.infiniteScrollOptions.preload | --- | 是否在用户实际到达底部之前预加载内容 |
| pagination.infiniteScrollOptions.threshold | --- | 触发加载更多内容的阈值(像素) |
