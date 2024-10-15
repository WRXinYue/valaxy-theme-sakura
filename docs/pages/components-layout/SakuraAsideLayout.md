---
title: SakuraAside
title_zh-CN: 侧边 (SakuraAside)
toc: true
categories:
  - components-layout
---

## 侧边 SakuraAside

## 基础用法

```vue
<template>
  <SakuraMultiColumns>
    <template #content />
    <template #right>
      <SakuraAside>
        <!-- components -->
      </SakuraAside>
    </template>
  </SakuraMultiColumns>
</template>
```

## 菜单栏 + 文章目录

```vue
<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <Layout>
    <SakuraMultiColumns>
      <template #left>
        <SakuraAside>
          <SidebarThemeDynamic />
        </SakuraAside>
      </template>
      <template #content>
        <RouterView />
      </template>
      <template #right>
        <SakuraAside>
          <SakuraToc v-if="!isHome" />
        </SakuraAside>
      </template>
    </SakuraMultiColumns>
  </Layout>
</template>
```

## API

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义侧边内容 |
