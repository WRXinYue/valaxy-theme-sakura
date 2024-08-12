---
title: SakuraBackgroundDisplay
title_zh-CN: 背景显示 (SakuraBackgroundDisplay)
toc: true
categories:
  - components
---

## 背景显示 SakuraBackgroundDisplay

背景显示组件负责自动获取ThemeConfig中的`banner urls`配置选项。该组件兼容单个URL或URL数组，同时也支持视频壁纸

`wallpaperKey`属性用于与壁纸切换逻辑进行绑定。利用不同的`wallpaperKey`，可以实现多个背景显示组件的复用

## 预览

<SakuraBackgroundDisplayPG />

## API

### Attributes

| 属性名       | 类型                 | 默认值      | 说明                       |
| ------------ | -------------------- | ----------- | -------------------------- |
| urls         | `string \| string[]` | `undefined` | 指定背景图像的URL或URL数组 |
| wallpaperKey | `string`             | `'banner'`  | 用于壁纸切换逻辑绑定的键值 |

### ThemeConfig

| 属性名      | 类型                 | 默认值      | 说明                       |
| ----------- | -------------------- | ----------- | -------------------------- |
| banner.urls | `string \| string[]` | `undefined` | 指定背景图像的URL或URL数组 |
