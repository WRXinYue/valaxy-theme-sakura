---
title: PaginationThemeValaxy
title_zh-CN: PaginationThemeValaxy
toc: true
categories:
  - components-themes
---

## PaginationThemeValaxy

## 预览

<PaginationThemeValaxyPG />

::: warning
Valaxy默认分页组件只支持对 `/page/*` 这种分页方式，所以只能在 Home 布局文章分页使用
:::

## API

### ThemeConfig

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| pagination.itemsPerPage | --- | 每页项目数 (优先度2) |
| pagination.infiniteScrollOptions.preload | --- | 是否在用户实际到达底部之前预加载内容 |
| pagination.infiniteScrollOptions.threshold | --- | 触发加载更多内容的阈值(像素) |

### SiteConfig

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| pageSize | --- | 每页项目数 (优先度1) |

### Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| pageSize | `number` | `undefined` | 每页项目数 (优先度3) |
| total | `number` | `undefined` | 优先使用`posts.length` |
