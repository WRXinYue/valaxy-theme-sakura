---
title: Other config
title_zh-CN: 其他配置
toc: true
categories:
  - config
codeHeightLimit: 300
---

## 其他配置

### scrollDamping

页面是否启用滚动阻尼效果

```ts
export interface ThemeConfig {
  scrollDamping?: boolean
}
```

### animation

页面是否启用动画

```ts
export interface ThemeConfig {
  animation?: boolean
}
```

### showBackToTop(弃用)

是否显示返回顶部按钮(BackToTop)组件

```ts
export interface ThemeConfig {
  showBackToTop?: boolean
}
```
