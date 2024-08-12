---
title: SakuraToc
title_zh-CN: 目录 (SakuraToc)
toc: true
categories:
  - components
---

## 目录 SakuraToc

TOC是 "Table of Contents" 的缩写，用于博客或文档列出章节或部分的标题在文档中的位置，帮助读者快速找到所需内容

## API

### Attributes

| 属性名     | 类型      | 默认值  | 说明                                                |
| ---------- | --------- | ------- | --------------------------------------------------- |
| viewScroll | `boolean` | `false` | 自动滚动 TOC 视图，如果网站最底部为页脚则不推荐启用 |

::: warning
启用 viewScroll 时，页面 TOC 元素必须位于网站视图最底部，否则会导致无法滚动视图 [Issues #3](https://github.com/WRXinYue/valaxy-theme-sakura/issues/3)
:::

### Frontmatter

| 属性名 | 类型      | 默认值 | 说明         |
| ------ | --------- | ------ | ------------ |
| toc    | `boolean` | `true` | 是否显示目录 |

### Slots

| 插槽名  | 说明 |
| ------- | ---- |
| default | ---  |

## 相关组件

- SakuraOutline
