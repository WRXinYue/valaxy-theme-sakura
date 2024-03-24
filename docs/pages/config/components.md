---
title: Component config
title_zh-CN: Component 组件配置
toc: true
categories:
  - config
---

## Component 组件

由于 valaxy 是基于 vue 构建的博客框架，我们可以充分利用 Vue 的全部功能和特性，在此，**组件(Component)** 是 Vue 中的一个核心概念，一个页面可以是由多个组件相结合，这样不仅可以将界面分割成独立、可复用的单元，还能够根据个人偏好自由组合这些单元以构建网页。这种做法使得代码变得更加模块化和有序，在这里我们不需要关注 Vue **组件(Component)** 核心机制， 我们只需学会如何配置即可，如果您想深入了解 **组件(Component)** 的相关信息，请参考 [Vue 官方文档](https://vuejs.org/guide/essentials/component-basics)

## 组件配置

每个组件都会在文章列表进行展示，您可以进行在线编辑来实时预览主题

在组件里您可能发现**配置选项**,如：

```ts
export interface ThemeConfig {
  banner: {
    enable?: boolean
    title?: string
    motto?: string
    urls: string[]
    style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  }
}
```

在 Valaxy 中，`ThemeConfig`是`export default defineValaxyConfig<ThemeConfig>`中的`themeConfig`部分，允许用户对主题进行个性化配置。以下是 valaxy-theme-sakura 主题的Banner配置示例：

```ts
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    banner: {
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/optimize/cGZ4kz2q.webp',
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg',
      ],
      style: '',
    },
  },
})
```

::: tip
在TypeScript中，当您看到`enable?: boolean`这样的语法时，这意味着`enable`属性是可选的

更多关于可选属性的信息，请参考[TypeScript Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)
:::

有时您可能会遇到以下接口定义方式，它定义了 `ThemeConfig` 应有的结构，但实质上与上面的示例配置具有相同的含义：

```ts
export interface ThemeConfig {
  banner: SakuraTheme.Banner
}
```

```ts
export interface Banner {
  enable?: boolean
  title?: string
  motto?: string
  urls: string[]
  style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
}
```

## 自定义组件

请见[Valaxy Components](https://valaxy.site/guide/custom/components)

## 组件替换

和自定义组件原理相同，只要命名为与原主题相同组件名就会自动进行替换
