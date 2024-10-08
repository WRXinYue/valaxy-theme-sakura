---
title: SakuraBannerCustom
title_zh-CN: 横幅 (SakuraBannerCustom)
toc: true
categories:
  - components-custom
---

## 横幅 SakuraBannerCustom

Banner 横幅当中可以配置博客首页大屏壁纸或者标题之类的

## 基础用法

这里分别配置 `overlay-bar` 为 `InfoOverlayThemeSakura` 主题和 `info-overlay` 为 `InfoOverlayThemeSakura` 主题：

```vue
<template>
  <SakuraBanner>
    <template #background-display>
      <SakuraBackgroundDisplay />
    </template>
    <template #overlay-bar>
      <WaveThemeHorizontal />
    </template>
    <template #info-overlay>
      <InfoOverlayThemeSakura />
    </template>
  </SakuraBanner>
</template>
```

<SakuraBannerCustomPG theme="sakura" />

## 固定横幅高度

通过添加`h-[calc(100vh-var(--sakura-c-footer-height))]!`，可以使横幅和页脚的高度总和等于100vh

```vue
<template>
  <SakuraBanner class="h-[calc(100vh-var(--sakura-c-footer-height))]!">
    <template #info-overlay>
      <InfoOverlayThemeHero />
    </template>
  </SakuraBanner>
</template>
```

## API

### ThemeConfig

```ts
export interface ThemeConfig {
  banner: {
    title?: string
    motto?: string
    urls: string[] | string
    style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  }
}
```

| 名称  | 类型                                                      | 默认值                                                         | 说明                                                                                                                                                                                                   |
| ----- | --------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title | `string`                                                  | `'Hello, sakura'`                                              | 首页标题                                                                                                                                                                                               |
| motto | `string`                                                  | `'You got to put the past behind you before you can move on.'` | 首页标语 (写下愿景也很不错呀)                                                                                                                                                                          |
| urls  | `string[] \| string`                                      | `undefined`                                                    | 用于网站头部背景壁纸链接支持图片及视频,支持填入多个                                                                                                                                                    |
| style | `'\|filter-dot\|' \| 'filter-dim' \| 'filter-grid' \| ''` | `'filter-dim'`                                                 | 背景图片的过滤样式，可选值为`'filter-dot'`（点状过滤效果）、<br class="<md:hidden" />`'filter-dim'`（昏暗过滤效果）、`'filter-grid'`（网格过滤效果）<br class="<md:hidden" /> 或空字符串（无过滤效果） |

## 主题组件

### overlay-bar

- [WaveThemeFish](/components-themes/WaveThemeFish)
- [WaveThemeHorizontal](/components-themes/WaveThemeHorizontal)
- [WaveThemeRipple](/components-themes/WaveThemeRipple)

### info-overlay

- [InfoOverlayThemeSakura](/components-themes/InfoOverlayThemeSakura)
- [InfoOverlayThemeHero](/components-themes/InfoOverlayThemeHero)

## 相关组件

- [SakuraBanner](/components/SakuraBanner)
- [SakuraBackgroundDisplay](/components/SakuraBackgroundDisplay)
