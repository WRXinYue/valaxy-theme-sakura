---
# cover: https://fastly.jsdelivr.net/gh/YunYouJun/cdn/img/bg/girl-in-water-tank.webp
cover: https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/optimize/60651947_p0.webp
title: Hello, Valaxy!
date: 2022-03-22
updated: 2022-03-23
categories: Valaxy Notes
tags:
  - valaxy
  - 笔记
top: 1
outline: deep
excerpt: Valaxy aims to be a next generation of static blogging frameworks/generators.
---

```md
{{ frontmatter }}
```

{{ frontmatter }}

## What is Valaxy? {lang="en"}

::: en
Valaxy aims to be a next generation of static blogging frameworks/generators.
:::

## 什么是 Valaxy? {lang="zh-CN"}

::: zh-CN
Valaxy 的目标是成为新一代的静态博客框架/生成器。
:::

More info see [valaxy.site](https://valaxy.site).

```ts
/**
 * User Config
 * do not use export const, because c12 will set as child property
 */
export default defineValaxyConfig<ThemeConfig>({
  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '云游君的小站',
    },
  },
})
```
