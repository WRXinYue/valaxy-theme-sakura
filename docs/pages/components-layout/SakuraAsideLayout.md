---
title: SakuraAsideLayout
title_zh-CN: 侧边 (SakuraAsideLayout)
toc: true
categories:
  - components-layout
---

## 侧边 SakuraAsideLayout

## 基础用法

```vue
<template>
  <SakuraMultiColumnsLayout>
    <template #content />
    <template #right>
      <SakuraAsideLayout>
        <!-- components -->
      </SakuraAsideLayout>
    </template>
  </SakuraMultiColumnsLayout>
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
    <SakuraMultiColumnsLayout>
      <template #left>
        <SakuraAsideLayout>
          <SidebarThemeDynamic />
        </SakuraAsideLayout>
      </template>
      <template #content>
        <RouterView />
      </template>
      <template #right>
        <SakuraAsideLayout>
          <SakuraToc v-if="!isHome" />
        </SakuraAsideLayout>
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>
```

## API

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义侧边内容 |
