---
title: WaveThemeFish
title_zh-CN: WaveThemeFish
toc: true
categories:
  - components-themes
---

## WaveThemeFish

未知来源，在原代码基础上进行使用typescript重构去除对jQuery的依赖

## 预览

<WaveThemeFishPG />

```vue
<template>
  <SakuraBanner h-160>
    <template #background-display>
      <SakuraBackgroundDisplay />
    </template>
    <template #banner-overlay-bar>
      <WaveThemeFish />
    </template>
  </SakuraBanner>
</template>
```

## API

### Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| color | `string` | `'var(--st-c-bg)'` | 鱼的颜色 |
