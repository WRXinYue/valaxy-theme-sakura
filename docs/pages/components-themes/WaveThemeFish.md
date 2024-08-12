---
title: WaveThemeFish
title_zh-CN: WaveThemeFish
toc: true
categories:
  - components-themes
---

## WaveThemeFish

基于原代码进行 TypeScript 重构，去除了对 jQuery 的依赖。组件源码注释为中文，有兴趣的小伙伴可以阅读[`WaveThemeFish`](https://github.com/WRXinYue/valaxy-theme-sakura/blob/main/theme/components/themes/WaveThemeFish.vue)源码学习。

## 预览

<WaveThemeFishPG />

```vue
<template>
  <SakuraBanner h-160>
    <template #background-display>
      <SakuraBackgroundDisplay />
    </template>
    <template #overlay-bar>
      <WaveThemeFish />
    </template>
  </SakuraBanner>
</template>
```

## API

### Attributes

| 属性名 | 类型     | 默认值             | 说明     |
| ------ | -------- | ------------------ | -------- |
| color  | `string` | `'var(--st-c-bg)'` | 鱼的颜色 |
