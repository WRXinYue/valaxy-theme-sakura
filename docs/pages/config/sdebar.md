---
title: Sidebar
title_zh-CN: 侧边栏
toc: true
categories:
  - config
codeHeightLimit: 300
---

```ts
export interface ThemeConfig {
  favicon: boolean
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
| favicon |  | 网站顶部的图标，通常显示在浏览器的地址栏或标签页上。 |
| nav |  | 定义网站导航栏的项目。是一个包含`NavItem`对象的数组。 |

### NavItem

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| text |  | 导航栏项的显示文本。 |
| locale |  | 导航栏项的语言设置，用于国际化支持。 |
| link |  | 导航栏项的链接地址，点击后用户将被重定向到此URL。 |
| icon |  | 导航栏项的图标，可以是图标的路径或图标库中的一个标识符。 |
