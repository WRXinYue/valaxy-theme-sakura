---
title: SakuraArticleListCustom
title_zh-CN: 文章列表 (SakuraArticleListCustom)
toc: true
categories:
  - components-custom
---

## 文章列表 SakuraArticleListCustom

网格布局（Grid Layout）：在网格布局中，所有的卡片按照严格的行和列排列，每个卡片占据相同大小的空间，形成一个整齐的网格状结构。这种布局适用于卡片内容大小一致，需要整齐对齐展示的场景，使页面看起来更加有序和统一。

瀑布流布局（Masonry Layout）：瀑布流布局则更加灵活，允许卡片根据内容的大小在垂直方向上自然堆叠，不同行的卡片可以有不同的高度。这种布局类似于建筑中的石墙，各个元素根据内容的大小自然排列，充分利用了空间，适合展示大小不一的内容，使页面看起来更加动态和自然。

```vue
<template>
  <SakuraIconTextDivider icon="i-fa6-solid:water" text="文章列表" />
  <ArticleListThemeCard />
</template>
```

<SakuraIconTextDivider icon="i-fa6-solid:water" text="文章列表" />
<ArticleListThemeCard />

## 插槽主题

- [ArticleListThemeCard](/components-themes/ArticleListThemeCard)
- [ArticleListThemeMasonry](/components-themes/ArticleListThemeGrid)
- [ArticleListThemeGrid](/components-themes/ArticleListThemeMasonry)
- [ArticleListThemeMinima](/components-themes/ArticleListThemeMinima)

## 相关组件

- SakuraIconTextDivider
