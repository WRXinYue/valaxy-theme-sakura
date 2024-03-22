---
title: Banner
title_zh-CN: Banner 横幅
toc: true
categories:
  - components
---

## Banner 横幅

Banner 横幅当中可以配置博客首页大屏壁纸或者标题之类的，您也可以什么都不配置，或者添加更多的样式风格，完全取决于自己。这个配置是您的第一个需要配置的地方，

### 预览

<SakuraBannerPG />

### 配置选项

```ts
export interface ThemeConfig {
  banner: {
    enable?: boolean
    title?: string
    motto?: string
    urls: string[] | string
    style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  }
}
```

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| title  | Hello, sakura | 首页标题 |
| motto  | You got to put the past behind you before you can move on. | 首页标语 (写下愿景也很不错呀) |
| urls | | 用于网站头部背景壁纸链接支持图片及视频,支持填入多个 |
| style | 'filter-dim' | 背景图片的过滤样式，可选值为`'filter-dot'`（点状过滤效果）、<br class="<md:hidden" />`'filter-dim'`（昏暗过滤效果）、`'filter-grid'`（网格过滤效果）<br class="<md:hidden" /> 或空字符串（无过滤效果） |
