---
title: SidebarThemeDynamic
title_zh-CN: SidebarThemeDynamic
toc: true
categories:
  - components-themes
---

## SidebarThemeDynamic <SupTag>0.6.0</SupTag>

用来自动根据目录结构生成导航，适用于文档、知识库

<SidebarThemeDynamicPG />

## API

### ThemeConfig

```ts
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
