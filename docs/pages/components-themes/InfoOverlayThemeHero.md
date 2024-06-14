---
title: InfoOverlayThemeHero
title_zh-CN: InfoOverlayThemeHero
toc: true
categories:
  - components-themes
---

## InfoOverlayThemeHero <SupTag>0.6.1</SupTag>

该组件适合用来简单的进行自我介绍，主要强调 **信息内容**，如果您喜欢简约的首屏，这个组件是个不错的选择

## 默认

在默认情况，系统会获取配置来显示默认画面

<InfoOverlayThemeHeroPG :demo="1" />

```vue
<template>
  <InfoOverlayThemeHero />
</template>
```

## 自定义文字

具体插槽参数请看 [API](#api)

### 从插槽添加文字

除了从配置上修改，我们可以直接从插槽上修改，在这里我们为了方便演示只保留一段文字，如下：

<InfoOverlayThemeHeroPG :demo="2" />

```vue
<template>
  <InfoOverlayThemeHero>
    <template #intro-text>
      <div />
    </template>
    <template #highlighted-text>
      This is custom text.
    </template>
    <template #subheading-text>
      <div />
    </template>
    <template #muted-text>
      <div />
    </template>
  </InfoOverlayThemeHero>
</template>
```

### 调整字体大小

调整字体大小正常写css即可，这里使用unocss语法

<InfoOverlayThemeHeroPG :demo="3" />

```vue
<template>
  <InfoOverlayThemeHero>
    <template #intro-text>
      <div />
    </template>
    <template #highlighted-text>
      <span text="2xl md:5xl">
        This is custom text.
      </span>
    </template>
    <template #subheading-text>
      <div />
    </template>
    <template #muted-text>
      <div />
    </template>
  </InfoOverlayThemeHero>
</template>
```

在上述代码中，`text="2xl md:5xl"` 用于指定不同屏幕尺寸下的文本大小：

- `2xl` 表示在默认情况下（通常是移动设备或小屏幕）文本大小为 2xl。
- `md:5xl` 表示在中等屏幕（通常是平板或桌面设备）及更大屏幕上文本大小为 5xl。

:::tip
`text="2xl md:5xl"` 等同于 `class="text-2xl md:text-5xl"`
:::

更多信息请访问 [unocss字体预设](https://unocss.dev/interactive/?s=font-size) 查询相关信息

### 实现动态打字效果

这里用 `SakuraTypewriter` 组件来实现打字效果，可以配置多个文字和多个效果:

<InfoOverlayThemeHeroPG :demo="4" />

```vue
<template>
  <InfoOverlayThemeHero>
    <template #intro-text>
      <div />
    </template>
    <template #highlighted-text>
      <span text="2xl md:5xl">
        <SakuraTypewriter
          :type-string="['This is custom text.', 'Another example text.']"
          :delete-all="[100, 200]" loop :pause-for="[3000]"
        />
      </span>
    </template>
    <template #subheading-text>
      <div />
    </template>
    <template #muted-text>
      <div />
    </template>
    <template #social>
      <div />
    </template>
  </InfoOverlayThemeHero>
</template>
```

这里的 `SakuraTypewriter` 组件 **Attributes** 参数简单介绍一下：

- `typeString`: 要输入的字符串，可以包含HTML标签
- `deleteAll`: 删除所有可见节点的速度, 如果为`true`则全部字符串数组都进行清除，也可以是数字或'natural'
- `loop`: 是否循环播放
- `pauseFor`: 在输入完一个字符串后暂停的时长，默认值为 1500 毫秒

更多详细信息请访问 [SakuraTypewriter](/components/SakuraTypewriter) 组件详情

## 关于文字动画

该组件文字动画默认用的是 [sakura animation](/styles/animation) 的 `animation-fade-up`, 并使用 css `animation-delay` 属性来实现动画执行顺序

最小实现例子：

```html
<div class="animation-fade-up" style="animation-delay: 200ms;">
Animation 1
</div>

<div class="animation-fade-up" style="animation-delay: 400ms;">
Animation 2
</div>

<div class="animation-fade-up" style="animation-delay: 600ms;">
Animation 3
</div>
```

## API

### Slots

| 插槽名 | 说明 |
| --- | --- |
| intro-text | 用于插入自定义的介绍文本。默认显示 `themeConfig.banner.title` |
| highlighted-text | 用于插入自定义的高亮文本。默认显示 `I'm {{ siteConfig.author.name }}` |
| subheading-text | 用于插入自定义的副标题文本。默认显示 `SakuraTypewriter` 组件中 `siteConfig.description` 和 `siteConfig.author.status.message` 结合 `siteConfig.author.status.emoji` |
| muted-text | 用于插入自定义的静音文本。默认显示 `themeConfig.banner.motto` |
| social | 用于插入自定义的社交媒体图标列表。默认根据 `siteConfig.social` 渲染社交媒体图标 |
| utils | 用于插入自定义的实用工具组件 |

### ThemeConfig

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| banner.title | `string` | `'Hello, sakura'` | --- |
| banner.motto | `string` | `'You got to put the past behind you before you can move on.'` | --- |

### SiteConfig

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| social | `SocialLink[]` | `undefined` | 社交链接 |
| author.name | `string` | --- | --- |
| author.status.message | `string` | --- | --- |
| author.status.emoji | `string` | --- | --- |
