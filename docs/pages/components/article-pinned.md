---
title: Pinned article
title_zh-CN: ArticlePinned 置顶文章
toc: true
categories:
  - components
codeHeightLimit: 300
---

## ArticlePinned 置顶文章

常见于 Home 页 Banner(横幅) 底部的置顶文章

### 自定义插槽

`<SakuraArticlePinnedCustom />`

```vue
<template>
  <ArticlePinnedThemeStartDash />
</template>
```

### 插槽主题

#### StartDash 开始冲刺 {lang="zh-CN"}
#### START:DASH!! {lang="en"}

<SakuraArticlePinnedPG />

```ts
export interface ThemeConfig {
  articlePinned?: {
    title?: string // 标题
    desc?: string // 文本
    img?: string // 图片URL
    link?: string // 跳转链接
  }[]
}
```
