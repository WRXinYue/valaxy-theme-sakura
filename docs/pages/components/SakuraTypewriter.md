---
title: SakuraTypewriter
title_zh-CN: 打字机 SakuraTypewriter
toc: true
categories:
  - components
---

## 打字机 SakuraTypewriter <SupTag>0.6.1</SupTag>

SakuraTypewriter 基于 [TypeIt](https://github.com/alexmacarthur/typeit) 实现。如果您需要简单易用的打字机效果，可以使用此组件

## 基础使用

<SakuraTypewriterPG :demo="0" />

```vue
<SakuraTypewriter type-string="This is a typing effect" />
```

## 开启循环

<SakuraTypewriterPG :demo="1" />

```vue
<SakuraTypewriter type-string="This is a typing effect" loop />

<!-- or -->
<SakuraTypewriter type-string="This is a typing effect" :loop="true" />
```

## 设定输入字符串后暂停时间

<SakuraTypewriterPG :demo="2" />

```vue
<template>
  <SakuraTypewriter type-string="This is a typing effect" loop :pause-for="500" />
</template>
```

## 设定字符串删除速度

数字越大，延迟越高

<SakuraTypewriterPG :demo="3" />

```vue
<template>
  <SakuraTypewriter type-string="This is a typing effect" loop :pause-for="500" :delete-all="100" />
</template>
```

## 自定义HTML

由于 `type-string` 支持 HTML，因此可以在字符串中嵌入 `style` 样式

<SakuraTypewriterPG :demo="4" />

```vue
<template>
  <SakuraTypewriter type-string="<span class='color-red'>This is a typing effect</span>" loop />
</template>
```

## 多组字符串

为了实现多组字符串打字效果，可以将 `type-string` 改为数组。支持数组的选项也可以根据对应的字符串进行配置

<SakuraTypewriterPG :demo="5" />

```vue
<template>
  <SakuraTypewriter :type-string="['hello valaxy', 'hello sakura']" loop :pause-for="500" :delete-all="[100, 50]" />
</template>
```

## API

### Attributes

::: zh-CN

| 属性名      | 类型                              | 默认值      | 说明                                                                              |
| ----------- | --------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| delay       | `number`                          | `75`        | 输入每个键之间的延迟                                                              |
| deleteSpeed | `number`                          | ---         | 删除每个字符之间的延迟                                                            |
| loop        | `boolean`                         | `false`     | 是否循环                                                                          |
| pauseFor    | `number` \| `number[]`            | `1500`      | 使用自动启动模式时，在输入一个字符串后暂停的时间                                  |
| typeString  | `string` \| `string[]`            | `undefined` | 使用打字机效果输入字符串 <br /> 要输入的字符串，可以包含 HTML 标签                |
| deleteAll   | `number` \| `boolean` \| `number` | ---         | 删除打字机包装元素内所有可见内容 <br />删除所有可见节点的速度，可以是数字或“自然” |

:::

::: en

| Name        | Type                              | Default     | Description                                                                                                                                      |
| ----------- | --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| delay       | `number`                          | `75`        | The delay between each key when typing                                                                                                           |
| deleteSpeed | `number`                          | ---         | The delay between deleting each character                                                                                                        |
| loop        | `boolean`                         | `false`     | Whether to keep looping or not                                                                                                                   |
| pauseFor    | `number` \| `number[]`            | `1500`      | The pause duration after a string is typed when using autostart mode                                                                             |
| typeString  | `string` \| `string[]`            | `undefined` | Type out a string using the typewriter effect <br />String to type out, it can contain HTML tags                                                 |
| deleteAll   | `number` \| `boolean` \| `number` | ---         | Delete everything that is visible inside of the typewriter wrapper element <br /> Speed to delete all visibles nodes, can be number or 'natural' |

:::
