---
title: Sidebar
title_zh-CN: Sidebar 侧边栏
toc: true
categories:
  - components
---

## Sidebar 侧边栏

配置侧边栏 (Sidebar) 和导航栏 (Navbar) 的方法大致相似。例如，NavItem 类型既可以用于侧边栏也可以用于导航栏。若需编写技术文档，您可选择使用 SidebarMulti 类型。需要注意的是，侧边栏提供了更多的配置选项

### 自定义插槽

`<SakuraSidebarCustom/>`

```vue
<template>
  <SakuraSidebar>
    <SidebarThemeOverview />
  </SakuraSidebar>
</template>
```

### 插槽组件

侧边栏作为一个全局组件，直接在本文档中展示会干扰到文档的侧边栏布局，因此请通过以下链接查看预览

* [SidebarThemeDynamic](/sidebar-dynamic)
* [SidebarThemeOverview](/sidebar-overview)

### 配置选项

Sidebar Overview布局使用 `NavItem` 配置项， Sidebar Dynamic布局使用 `SidebarMulti` 配置项

::: code-group

```ts [dynamic]
export interface ThemeConfig {
  sidebar: NavItem[] // 这里的 `NavItem` 和导航栏 `NavItem` 是相同
}

export interface NavItem {
  text?: string
  locale?: string | number
  link: string
  icon?: string
  isExternal?: boolean
  submenu?: NavItem[]
}
```

```ts [overview]
export interface ThemeConfig {
  sidebar: SidebarMulti
}

export type SidebarMulti = (string | SidebarItem)[]
export interface SidebarItem {
  text?: string // 项的文本标签
  link?: string // 项的链接
  items?: SidebarItem[] // 项的子项
  collapsed?: boolean // 如果未指定，分组不可折叠。如果为 `true`，则分组可折叠且默认折叠。如果为 `false`，则分组可折叠但默认展开
  base?: string // 子项的基础路径
  docFooterText?: string // 自定义出现在上/下一页页脚的文本
  rel?: string // 定义链接与当前文档的关系。常用于指定外部链接的属性，如 `nofollow`，但在此配置中可能有不同的用途或不被使用
  target?: string // 指定链接打开的位置，如 `_blank` 以在新标签页中打开链接。在此配置中可能用于控制如何打开侧边栏项的链接
}
```

### TODO: 待完善

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| sidebarPCOptions |  | 配置PC端的侧边栏选项 |
| sidebarMobileOptions |  | 配置移动端的侧边栏选项 |
| enable |  | 是否显示 |
| pushMode |  | "推动"或"挤压"主内容区域 |
| defaultOpen |  | 是否默认打开侧边栏 |
| hamburger |  | 是否显示控制侧边栏显示或隐藏的按钮 |
