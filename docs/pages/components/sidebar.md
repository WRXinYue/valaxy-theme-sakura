---
title: Sidebar
title_zh-CN: Sidebar 侧边栏
toc: true
categories:
  - components
---

## Sidebar 侧边栏

配置侧边栏 (Sidebar) 和导航栏 (Navbar) 的方法大致相似。例如，NavItem 类型既可以用于侧边栏也可以用于导航栏。若需编写技术文档，您可选择使用 SidebarMulti 类型。需要注意的是，侧边栏提供了更多的配置选项

### 预览

<SakuraSidebarPG />

### 配置选项

```ts
export interface ThemeConfig {
  sidebar: NavItem[] | SidebarMulti
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
  export type SidebarMulti = (string | SidebarItem)[]
  export interface SidebarItem {
    text?: string
    link?: string
    items?: SidebarItem[]
    collapsed?: boolean
    base?: string
    docFooterText?: string
    rel?: string
    target?: string
  }
}
```

这里的 `NavItem` 和导航栏 `NavItem` 是相同的，Sidebar Overview布局使用 `NavItem` 配置项， Sidebar Dynamic布局使用 `SidebarMulti` 配置项

| 名称            | 默认值 | 描述                                                                                                         |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| text            |      | 项的文本标签                                                                                               |
| icon            |      | 图标                                                                                                       |
| link            |      | 项的链接                                                                                                   |
| items           |      | 项的子项                                                                                                   |
| collapsed       |      | 如果未指定，分组不可折叠。如果为 `true`，则分组可折叠且默认折叠。如果为 `false`，则分组可折叠但默认展开       |
| base            |      | 子项的基础路径                                                                                             |
| docFooterText   |      | 自定义出现在上/下一页页脚的文本                                                                             |
| rel             |      | 定义链接与当前文档的关系。常用于指定外部链接的属性，如 `nofollow`，但在此配置中可能有不同的用途或不被使用   |
| target          |      | 指定链接打开的位置，如 `_blank` 以在新标签页中打开链接。在此配置中可能用于控制如何打开侧边栏项的链接         |

::: warning
以下配置可能较为复杂，初学者请略过下面配置
:::

```ts
export interface ThemeConfig {
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

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| sidebarPCOptions |  | 配置PC端的侧边栏选项 |
| sidebarMobileOptions |  | 配置移动端的侧边栏选项 |
| enable |  | 是否显示 |
| pushMode |  | "推动"或"挤压"主内容区域 |
| defaultOpen |  | 是否默认打开侧边栏 |
| hamburger |  | 是否显示控制侧边栏显示或隐藏的按钮 |

**介绍:**

此方法用于判断给定的路由对象是否与指定的条件相匹配。通过分析`conditions`参数，可以灵活地设置哪些路由需要被包含或排除。当`conditions`为`all`时，表示所有路由都被认为是匹配的。相反，当为`none`时，表示没有路由匹配。当`conditions`是一个字符串或字符串数组时，可以指定具体的路由模式来进行匹配或排除。如果路由模式前带有`-`前缀，则表示该路由模式是需要被排除的

**参数:**

- **route (RouteLocationNormalizedLoaded)**: 当前的路由对象。此对象应包含了路由的全部信息，用于与条件进行匹配
- **conditions (string|string[])**: 用于评估路由的条件。这些条件可以是：
  - **"all"**: 表示所有路由都满足条件
  - **"none"**: 表示没有路由满足条件
  - **字符串**: 指定一个单一的路由模式以匹配或排除（以`-`前缀表示排除）
  - **字符串数组**: 指定多个路由模式以匹配或排除（任何以`-`前缀的表示排除）

**示例：**

```ts
export default defineValaxyConfig<ThemeConfig>({
  siteConfig: {
    sidebarPCOptions: {
      enable: ['-home'],
      pushMode: ['-home'],
      defaultOpen: ['-home'],
      hamburger: 'none',
    },

    sidebarMobileOptions: {
      hamburger: '-home',
    },
  }
})
```
