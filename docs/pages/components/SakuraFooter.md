---
title: SakuraFooter
title_zh-CN: 页脚 (SakuraFooter)
toc: true
categories:
  - components
---

## 页脚 SakuraFooter

## 预览

<SakuraFooterPG />

## API

### Attributes

| 属性名 | 类型     | 默认值      | 说明 |
| ------ | -------- | ----------- | ---- |
| footer | `Footer` | `undefined` | ---  |

### ThemeConfig

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

| 名称          | 默认值                            | 描述                         |
| ------------- | --------------------------------- | ---------------------------- |
| since         | `2024`                            | 建站日期                     |
| icon.enable   | ---                               | 是否启用图标                 |
| icon.name     | ---                               | 图标的名称                   |
| icon.img      | ---                               | 图标的图片路径               |
| icon.animated | `true`                            | 图标是否有动画               |
| icon.url      | `'https://sponsors.yunyoujun.cn'` | 图标链接的URL                |
| icon.title    | `'WRXinYue'`                      | 鼠标悬停在图标上时显示的标题 |
| powered       | `true`                            | 是否显示“Powered by”信息     |
| beian.enable  | ---                               | 是否启用备案信息显示         |
| beian.icp     | ---                               | 备案号                       |

### Slots

| 插槽名  | 说明 |
| ------- | ---- |
| default | ---  |
