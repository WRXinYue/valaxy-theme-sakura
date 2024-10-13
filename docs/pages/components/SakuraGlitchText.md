---
title: SakuraGlitchText
title_zh-CN: 故障文字 SakuraGlitchText
toc: true
categories:
  - components
---

## 故障文字 SakuraGlitchText

## 基础使用

<SakuraGlitchTextPG :demo="0" />

```vue
<template>
  <SakuraGlitchText text="Glitch text effect" />
</template>
```

## 打字效果 <SupTag>0.6.1</SupTag>

基于 `SakuraTypewriter` 实现, 配置方式同 `SakuraTypewriter` 组件

<SakuraGlitchTextPG :demo="1" />

```vue
<template>
  <SakuraGlitchText type-string="Glitch text effect" loop :pause-for="600" :delete-all="50" />
</template>
```

## API

### Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `undefined` | 静态文本效果 |
| `[key: string]` | `TypewriterProps` | --- | 同 `TypewriterProps` 组件 |

## 相关组件

- [SakuraTypewriter](/components/SakuraTypewriter)
