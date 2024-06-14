---
title: WaveThemeYunCloud
title_zh-CN: WaveThemeYunCloud
toc: true
categories:
  - components-themes
---

## WaveThemeYunCloud

来自于`yun`主题的组件

## 预览

<WaveThemeYunCloudPG />

```vue
<template>
  <SakuraBanner h-160>
    <template #background-display>
      <SakuraBackgroundDisplay />
    </template>
    <template #overlay-bar>
      <WaveThemeYunCloud />
    </template>
  </SakuraBanner>
</template>
```

## API

### Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| color | `string` | `'#ffffff'` | 波浪的颜色 |
