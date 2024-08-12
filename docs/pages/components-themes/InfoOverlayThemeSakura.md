---
title: InfoOverlayThemeSakura
title_zh-CN: InfoOverlayThemeSakura
toc: true
categories:
  - components-themes
---

## InfoOverlayThemeSakura <SupTag>0.6.1</SupTag>

## 默认

在默认情况，系统会获取配置来显示默认画面

<InfoOverlayThemeSakuraPG :demo="1" />

## 自定义文字

如果您不想通过配置进行设置文字，或者想额外添加一些内容，可以在插槽上进行编辑

比如可以添加 `SakuraGlitchText` 组件实现故障文字效果

<InfoOverlayThemeSakuraPG :demo="2" />

```vue
<template>
  <InfoOverlayThemeSakura>
    <template #highlighted-text>
      <SakuraGlitchText text="Hello, Valaxy" />
    </template>
    <template #muted-text>
      <span class="inline-block color-amber" i-fa6-solid-bolt />
      Welcome to Valaxy 🌌
      <span class="inline-block color-amber" i-fa6-solid-bolt />
    </template>
  </InfoOverlayThemeSakura>
</template>
```

::: warning
如果使用 `span` 标签请使用 `inline-block` 属性确保 <span class="inline-block color-amber" i-fa6-solid-bolt /> `i-fa6-solid-bolt` 图标能正常显示
:::

## 打字效果

`SakuraGlitchText` 组件继承自 `SakuraTypewriter` 组件，实现了打字效果。您可以通过将 `text` 属性改为 `type-string` 来使用该功能。当然，您也可以直接使用 `SakuraTypewriter` 组件

<InfoOverlayThemeSakuraPG :demo="3" />

```vue
<template>
  <InfoOverlayThemeSakura>
    <template #highlighted-text>
      <SakuraGlitchText :type-string="themeConfig.banner.title" :delete-all="200" loop :pause-for="3000" />
    </template>
    <template #muted-text>
      <span class="inline-block" i-fa6-solid-quote-left />
      <SakuraTypewriter :type-string="themeConfig.banner.motto" :delete-all="20" loop :pause-for="3000" />
      <span class="inline-block" i-fa6-solid-quote-right />
    </template>
  </InfoOverlayThemeSakura>
</template>
```

## API

### Attributes

| 属性名       | 类型     | 默认值      | 说明             |
| ------------ | -------- | ----------- | ---------------- |
| banner       | `Banner` | `undefined` | ---              |
| wallpaperKey | `string` | `'banner'`  | 壁纸切换唯一键值 |

### Slots

| 插槽名           | 说明                                                                            |
| ---------------- | ------------------------------------------------------------------------------- |
| highlighted-text | 用于插入自定义的高亮文本。默认显示 `themeConfig.banner.title`                   |
| muted-text       | 用于插入自定义的浅色文本。默认显示 `themeConfig.banner.motto`                   |
| social           | 用于插入自定义的社交媒体图标列表。默认根据 `siteConfig.social` 渲染社交媒体图标 |

### ThemeConfig

| 属性名       | 类型     | 默认值                                                         | 说明 |
| ------------ | -------- | -------------------------------------------------------------- | ---- |
| banner.title | `string` | `'Hello, sakura'`                                              | ---  |
| banner.motto | `string` | `'You got to put the past behind you before you can move on.'` | ---  |

### SiteConfig

| 属性名 | 类型           | 默认值      | 说明     |
| ------ | -------------- | ----------- | -------- |
| social | `SocialLink[]` | `undefined` | 社交链接 |

## 相关组件

- [SakuraGlitchText](/components/SakuraGlitchText)
- [SakuraTypewriter](/components/SakuraTypewriter)
