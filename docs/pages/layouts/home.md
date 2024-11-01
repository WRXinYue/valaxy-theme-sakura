---
title: home layout
title_zh-CN: 主页布局 (home)
toc: true
categories:
  - layouts
---

## 主页布局 Home

主页就是博客的首页，我们推荐用`SakuraHomeLayout`组件快速搭建首页，更改主页布局也推荐使用`SakuraHomeLayout`进行更改

```vue
<template>
  <SakuraHomeLayout />
</template>
```

## SakuraHomeLayout

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

| 插槽名         | 说明                                                  |
| -------------- | ----------------------------------------------------- |
| banner         | 横幅插槽，默认组件`<SakuraBannerCustom />`            |
| notice-board   | 公告板插槽，默认组件`<SakuraNoticeBoardCustom />`     |
| article-pinned | 置顶文章插槽，默认组件`<SakuraPostPinnedCustom />` |
| article-list   | 文章列表插槽，默认组件`<SakuraPostListCustom />`   |
| pagination     | 分页插槽，默认组件`<SakuraPaginationCustom />`        |
| right          | ---                                                   |
| left           | ---                                                   |

## 相关组件

- [SakuraBannerCustom](/components-custom/SakuraBannerCustom)
- [SakuraNoticeBoardCustom](/components-custom/SakuraNoticeBoardCustom)
- [SakuraPostPinnedCustom](/components-custom/SakuraPostPinnedCustom)
- [SakuraPostListCustom](/components-custom/SakuraPostListCustom)
- [SakuraPaginationCustom](/components-custom/SakuraPaginationCustom)
