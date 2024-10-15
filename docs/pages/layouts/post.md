---
title: post layout
title_zh-CN: 文章布局 (post)
categories:
  - layouts
---

## 文章布局 post

```vue
<template>
  <SakuraPostLayout />
</template>
```

## SakuraPostLayout <SupTag>0.6.8</SupTag>

在文章页内部包含组件无需太大关注，`SakuraSponsor`及`ValaxyCopyright`是通过配置项来触发是否展示的

比如我们在这里想要修改文章底部，需要先新增`SakuraArticleFooterCustom`组件替换修改即可

## API

### Frontmatter

| 属性名    | 类型      | 默认值      | 说明                                            |
| --------- | --------- | ----------- | ----------------------------------------------- |
| sponsor   | `boolean` | `undefined` | 是否开启赞助，如果开启则显示`SakuraSponsor`组件 |
| copyright | `boolean` | `undefined` | 是否在**本页**显示文章底部版权信息              |

### SiteConfig

| 属性名          | 类型      | 默认值 | 说明                                                                                    |
| --------------- | --------- | ------ | --------------------------------------------------------------------------------------- |
| license.enabled | `boolean` | `true` | 是否在**全局**显示文章底部版权信息，如果文章配置了 `copyright` 选项则优先使用文章的设置 |

### Slots

| 插槽名  | 说明                                                     |
| ------- | -------------------------------------------------------- |
| left    | 默认没有内容，如果启用left插槽就代表启用三栏布局         |
| content | 通常不建议修改，主要显示文章主体内容                     |
| right   | 默认包含`SakuraAside`及`SakuraToc`组件，实现文章目录功能 |

## 相关组件

- [SakuraArticle](/components/SakuraArticle)
- [SakuraArticleFooterCustom](/components-custom/SakuraArticleFooterCustom)
- [SakuraToc](/components/SakuraToc)
