---
title: Theme Config
title_zh-CN: 主题配置
toc: true
categories:
  - getting-started
top: 300
---

<<< @/../theme/types/config.ts

## 示例

在 Valaxy 中，`ThemeConfig` 是 `export default defineValaxyConfig<ThemeConfig>` 中的 `themeConfig` 部分，允许用户对主题进行个性化配置以下是 valaxy-theme-sakura 主题 demo 的配置示例：

<<< @/../demo/valaxy.config.ts

::: tip
在TypeScript中，当您看到`enable?: boolean`这样的语法时，这意味着`enable`属性是可选的

更多关于可选属性的信息，请参考[TypeScript Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)
:::
