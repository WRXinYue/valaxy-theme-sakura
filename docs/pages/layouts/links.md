---
title: links layout
title_zh-CN: 友联布局 (links)
categories:
  - layouts
---

## 友联布局 links <SupTag>0.6.0</SupTag>

```vue
<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <SakuraMultiColumns class="mt-$sakura-navbar-height">
    <SakuraLinks :links="frontmatter.links" :random="frontmatter.random" />
  </SakuraMultiColumns>
</template>
```

## 启用友情板

新建 `pages/links/index.md` 文件

内容参考如下：

```md
---
layout: links
title: 友联板
keywords: 链接
description: 我的小伙伴们
links:
  - rss: https://www.yunyoujun.cn/atom.xml
  - rss: https://sakura.wrxinyue.org/atom.xml
  - rss: https://sakura.valaxy.site/atom.xml
# 也可以是一个 JSON 链接
# links: https://friends.yunyoujun.cn/links.json
random: true
comment: false
---
```

## 切换友联板主题

新建 `layouts/links.vue` 文件

复制最上面的默认例子，修改`LinksThemeYun`为喜欢自己的主题就行，`SakuraMultiColumns`作用是保持页面布局，不会让`LinksThemeYun`组件宽度过大

## 相关组件

- [SakuraLinks](/components/SakuraLinks)
- [SakuraMultiColumns](/components-layout/SakuraMultiColumns)
