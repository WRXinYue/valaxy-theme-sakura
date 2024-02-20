---
title: footer
title_zh-CN: 页脚
toc: true
categories:
  - config
codeHeightLimit: 300
---

```ts
export interface ThemeConfig {
  footer: Partial<{
    since: number
    icon: {
      enable?: boolean
      name?: string
      img?: string
      animated: boolean
      url: string
      title: string
    }
    powered: boolean
    beian: {
      enable: boolean
      icp: string
    }
  }>
}
```

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| since  |  | 建站日期 |
| icon.enable |  | 是否启用图标 |
| icon.name |  | 图标的名称 |
| icon.img |  | 图标的图片路径 |
| icon.animated |  | 图标是否有动画 |
| icon.url |  | 图标链接的URL |
| icon.title |  | 鼠标悬停在图标上时显示的标题 |
| powered |  | 是否显示“Powered by”信息 |
| beian.enable |  | 是否启用备案信息显示 |
| beian.icp |  | 备案号 |
