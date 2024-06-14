---
title: SakuraHomeLayout
title_zh-CN: 主页 (SakuraHomeLayout)
toc: true
categories:
  - components-layout
---

## 主页 SakuraHomeLayout

在默认情况下，`SakuraHomeLayout`都包含了一些默认的自定义(custom)组件，通常我们只需要修改custom组件就行

## 基础用法

在 `layouts` 文件夹中新建 `home.vue` 文件，并添加如下代码，以取消文章列表及分页：

```vue
<template>
  <SakuraHomeLayout>
    <template #article-list>
      <div />
    </template>
    <template #pagination>
      <div />
    </template>
  </SakuraHomeLayout>
</template>
```

## API

### Slots

| 插槽名 | 说明 |
| ---- | ---- |
| banner | 横幅插槽，默认组件`<SakuraBannerCustom />` |
| notice-board | 公告板插槽，默认组件`<SakuraNoticeBoardCustom />` |
| article-pinned | 置顶文章插槽，默认组件`<SakuraArticlePinnedCustom />` |
| article-list | 文章列表插槽，默认组件`<SakuraArticleListCustom />` |
| pagination | 分页插槽，默认组件`<SakuraPaginationCustom />` |
| right | --- |
| left | --- |

## 相关组件

* [SakuraBannerCustom](/components-custom/SakuraBannerCustom)
* [SakuraNoticeBoardCustom](/components-custom/SakuraNoticeBoardCustom)
* [SakuraArticlePinnedCustom](/components-custom/SakuraArticlePinnedCustom)
* [SakuraArticleListCustom](/components-custom/SakuraArticleListCustom)
* [SakuraPaginationCustom](/components-custom/SakuraPaginationCustom)
