---
title: SakuraNavbar
title_zh-CN: 导航栏 (SakuraNavbar)
toc: true
categories:
  - components
---

## SakuraNavbar

:::warning
该组件会在0.7.0版本逐渐迁移成主题组件
:::

## 预览

<SakuraNavbarPG />

## 改为侧边栏导航<SupTag>0.6.1</SupTag>

```vue
<template>
  <SakuraNavbar :col="true" />
</template>
```

## 如何让它不占用实际位置

由于 `SakuraNavbar` 默认使用 `position: sticky`，如果想要它不占用实际位置，请将定位改为 `fixed`

**示例：**

```scss
.sakura-navbar {
  position: fixed
}
```

或者

```scss
.app-container {
  margin-top: calc(-1 * var(--st-c-navbar-height));
}
```

## 自定义高度

修改css全局变量`--st-c-navbar-height`即可

## API

### Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| favicon | `boolean` | `undefined` | --- |
| title | `string \| string[]` | `undefined` | --- |
| invert | `boolean` | `false` | 滚动触发反转 |
| col | `boolean` | `false` | 改为侧边栏导航 |

### ThemeConfig

```ts
export interface ThemeConfig {
  navbar: NavItem[]
  navbarTitle: string | string[]
}
```

``` ts
export namespace SakuraTheme {
  export interface NavItem {
    text?: string
    locale?: string | number
    link: string
    icon?: string
    isExternal?: boolean
    submenu?: NavItem[]
  }
}
```

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| text | --- | 导航栏项的显示文本 |
| locale | --- | 导航栏项的语言设置，用于国际化支持 |
| link | --- | 导航栏项的链接地址，点击后将被重定向到此URL |
| icon | --- | 导航栏项的图标，可以是图标的路径或图标库中的一个标识符 |
| isExternal | --- | 是否使用 a 标签跳转(新手忽略) |
| submenu | --- | 二级菜单 |
| navbarTitle | --- | 导航栏标题 |
