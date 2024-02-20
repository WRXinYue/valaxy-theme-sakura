---
title: Navbar
title_zh-CN: 导航栏
toc: true
categories:
  - config
codeHeightLimit: 300
---

```ts
export interface ThemeConfig {
  favicon: boolean
  prefixName: string
  siteName: string
  nav: NavItem[]
}
export interface NavItem {
  text?: string
  locale?: string
  link: string
  icon?: string
}
```

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| favicon |  | 是否启用网站图标 |
| prefixName |  | 网站名称前缀 |
| siteName |  | 网站名称 |
| nav |  | 导航栏项目数组 |

### NavItem

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| text |  | 导航项的文本 |
| locale |  | 导航项的语言环境 |
| link |  | 导航项的链接地址 |
| icon |  | 导航项的图标路径 |
