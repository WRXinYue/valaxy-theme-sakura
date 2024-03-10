---
title: Sidebar
title_zh-CN: Sidebar 侧边栏
toc: true
categories:
  - components
codeHeightLimit: 300
---

## Sidebar 侧边栏

配置侧边栏 (Sidebar) 和导航栏 (Navbar) 的方法大致相似。例如，NavItem 类型既可以用于侧边栏也可以用于导航栏。若需编写技术文档，您可选择使用 SidebarMulti 类型。需要注意的是，侧边栏提供了更多的配置选项

### 预览

<SakuraSidebarPG />

### 配置选项

```ts
export interface ThemeConfig {
  sidebar: NavItem[] | SidebarMulti
  sidebarPCOptions: {
    enable: string | string[]
    pushMode: string | string[]
    defaultOpen: string | string[]
    hamburger: string | string[]
  }
  sidebarMobileOptions: {
    pushMode: string | string[]
    hamburger: string | string[]
  }
}
```

``` ts
export namespace SakuraTheme {
  export interface SidebarMulti {
    [path: string]: SidebarItem[] | { items: SidebarItem[], base: string }
  }
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
| sidebar |  | 定义网站侧边栏项目。`NavItem`对象的数组。 |
| sidebarPCOptions |  | 配置PC端的侧边栏选项 |
| sidebarMobileOptions |  | 配置移动端的侧边栏选项 |
| sidebarMobileOptions |  | 配置移动端的侧边栏选项 |
| enable |  | 是否显示 |
| pushMode |  | "推动"或"挤压"主内容区域 |
| defaultOpen |  | 是否默认打开侧边栏 |
| hamburger |  | 是否显示控制侧边栏显示或隐藏的按钮 |
