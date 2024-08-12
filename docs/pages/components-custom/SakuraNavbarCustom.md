---
title: SakuraNavbarCustom
title_zh-CN: 导航栏 (SakuraNavbarCustom)
toc: true
categories:
  - components-custom
---

## 导航栏 SakuraNavbarCustom

导航栏允许您配置页面间的跳转，例如到归档、关于页面，同时也可以设置网站图标和网站标题等元素

`SakuraNavbarCustom`默认会存在App.vue

## 基础用法

```vue
<template>
  <SakuraNavbar />
</template>
```

### 更改标题文字大小

```scss {1,5-6,9-10}
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-navbar-brand {
  .logo-link {
    font-size: 24px;
    font-weight: 600;

    @include screen('md') {
      font-size: 28px;
      font-weight: 800;
    }
  }

  .moe-mashiro {
    font-family: Moe-Mashiro, sans-serif;
  }
}
```

## API

### Slots

| 插槽名      | 说明 |
| ----------- | ---- |
| `nav-brand` | ---  |
| `nav-link`  | ---  |
| `nav-tool`  | ---  |

## 相关组件

- [SakuraNavbar](/components/SakuraNavbar)
