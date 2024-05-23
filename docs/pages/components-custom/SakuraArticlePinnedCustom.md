---
title: SakuraArticlePinnedCustom
title_zh-CN: 置顶 (SakuraArticlePinnedCustom)
toc: true
categories:
  - components-custom
---

## 置顶 SakuraArticlePinnedCustom

常见于 Home 页 Banner(横幅) 底部的置顶文章

```vue
<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <div v-if="themeConfig.articlePinned" class="<md:hidden">
    <SakuraIconTextDivider icon="i-fa6-solid:anchor" text="START:DASH!!" />
    <ArticlePinnedThemeStartDash />
  </div>
</template>
```

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
