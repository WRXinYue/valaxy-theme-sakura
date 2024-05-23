---
title: SakuraNavbarCustom
title_zh-CN: 导航栏 (SakuraNavbarCustom)
toc: true
categories:
  - components-custom
---

## 导航栏 SakuraNavbarCustom

导航栏允许您配置页面间的跳转，例如到归档、关于页面，同时也可以设置网站图标和网站标题等元素

```vue
<template>
  <SakuraNavbar />
</template>
```

### 预览

<SakuraNavbarPG />

### API

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
| text |  | 导航栏项的显示文本 |
| locale |  | 导航栏项的语言设置，用于国际化支持 |
| link |  | 导航栏项的链接地址，点击后将被重定向到此URL |
| icon |  | 导航栏项的图标，可以是图标的路径或图标库中的一个标识符 |
| isExternal |  | 是否使用 a 标签跳转(新手忽略) |
| submenu |  | 二级菜单 |
| navbarTitle |  | 导航栏标题 |
