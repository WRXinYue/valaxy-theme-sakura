---
title: SakuraHomeLayout
title_zh-CN: 主页 (SakuraHomeLayout)
toc: true
categories:
  - components-layout
---

## 主页 SakuraHomeLayout

## 基础用法

```vue
<template>
  <Layout>
    <SakuraHomeLayout>
      <template #content>
        <RouterView />
      </template>
    </SakuraHomeLayout>
  </Layout>
</template>
```

## API

### Slots

| 插槽名 | 说明 |
| --- | --- |
| notice-board | 默认组件`<SakuraNoticeBoardCustom />` |
| article-pinned | 默认组件`<SakuraArticlePinnedCustom />` |
| article-list | 默认组件`<SakuraArticleListCustom />` |
| pagination | 默认组件`<SakuraPaginationCustom />` |
| content | --- |

## 相关组件

* [SakuraBannerCustom](/components-custom/SakuraBannerCustom)
* [SakuraArticlePinnedCustom](/components-custom/SakuraArticlePinnedCustom)
* [SakuraArticleListCustom](/components-custom/SakuraArticlePinnedCustom)
* [SakuraPaginationCustom](/components-custom/SakuraPaginationCustom)
