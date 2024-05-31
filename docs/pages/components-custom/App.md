---
title: App
title_zh-CN: App
categories:
  - components-custom
---

## App

`App.vue`是一个特殊的组件，它应该被放置在项目的根目录下，而不是`components`文件夹中。这个文件在全局范围内都会生效

## 默认配置如下

```vue
<template>
  <SakuraNavbarCustom />
</template>
```

## 自定义

如果您想自定义或者不想要默认配置的[`SakuraNavbarCustom`](/components-custom/SakuraNavbarCustom)组件，进行替换即可。如:

```vue
<template>
  <div />
</template>
```
