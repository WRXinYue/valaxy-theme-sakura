---
title: Article list
title_zh-CN: ArticleList 文章列表
toc: true
categories:
  - components
---

## ArticleList 文章列表

网格布局（Grid Layout）：在网格布局中，所有的卡片按照严格的行和列排列，每个卡片占据相同大小的空间，形成一个整齐的网格状结构。这种布局适用于卡片内容大小一致，需要整齐对齐展示的场景，使页面看起来更加有序和统一。

瀑布流布局（Masonry Layout）：瀑布流布局则更加灵活，允许卡片根据内容的大小在垂直方向上自然堆叠，不同行的卡片可以有不同的高度。这种布局类似于建筑中的石墙，各个元素根据内容的大小自然排列，充分利用了空间，适合展示大小不一的内容，使页面看起来更加动态和自然。

### 自定义插槽

`<SakuraArticleListCustom />`

```vue
<template>
  <ArticleListThemeCard />
</template>
```

### 插槽主题

#### ArticleListThemeCard

<ArticleListThemeCard />

#### ArticleListThemeMasonry

<ArticleListThemeMasonry />

#### ArticleListThemeGrid

<ArticleListThemeGrid />

#### ArticleListThemeMinima

<ArticleListThemeMinima />

### 预览

### 相关

* [Pagination 分页](/components/pagination)
