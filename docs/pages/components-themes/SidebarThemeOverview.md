---
title: SidebarThemeOverview
title_zh-CN: SidebarThemeOverview
toc: true
categories:
  - components-themes
---

## SidebarThemeOverview <SupTag>0.6.0</SupTag>

提供了一个总览或概要，可以用来显示统计数据、关键信息点或摘要信息

## 预览

<SidebarThemeOverviewPG />

## API

### ThemeConfig

```ts
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
