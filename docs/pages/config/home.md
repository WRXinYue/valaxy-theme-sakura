---
title: 首页
title_zh-CN: 首页
toc: true
categories:
  - config
codeHeightLimit: 300
---

### 首页标题配置
```ts
export interface ThemeConfig {
  homeTitle: string
  homeMotto: string
}
```

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| homeTitle  | Hello, sakura | 首页标题 |
| homeMotto  | You got to put the past behind you before you can move on. | 首页标语 (写下愿景也很不错呀) |

### 首页壁纸配置

```ts
export interface ThemeConfig {
  headerWallpaper: {
    urls: string[]
    backgroundStyle: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  }
}
```

| 名称 | 默认值 | 描述 |
| ---- | ---- | ---- |
| headerWallpaper.urls | | 用于网站头部背景壁纸链接支持图片及视频,支持填入多个 |
| headerWallpaper.backgroundStyle | | 背景图片的过滤样式，可选值为`'filter-dot'`（点状过滤效果）、<br class="<md:hidden" />`'filter-dim'`（昏暗过滤效果）、`'filter-grid'`（网格过滤效果）<br class="<md:hidden" /> 或空字符串（无过滤效果） |
