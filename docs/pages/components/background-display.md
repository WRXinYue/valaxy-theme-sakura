---
title: Background display
title_zh-CN: BackgroundDisplay 背景显示
toc: true
categories:
  - components
---

## BackgroundDisplay 背景显示

背景显示组件（BackgroundDisplay）负责自动获取ThemeConfig中的`banner urls`配置选项。该组件兼容单个URL或URL数组，同时也支持视频壁纸

`wallpaperKey`属性用于与壁纸切换逻辑进行绑定。利用不同的`wallpaperKey`，可以实现多个背景显示组件的复用

### 预览

<SakuraBackgroundDisplayPG />

### 组件属性

```ts
const props = withDefaults(defineProps<{
  urls?: string[] // 指定背景图像的URL或URL数组
  wallpaperKey?: string // 用于壁纸切换逻辑绑定的键值
}>(), {
  wallpaperKey: 'banner',
})
```
