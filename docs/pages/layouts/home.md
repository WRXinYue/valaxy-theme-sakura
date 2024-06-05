---
title: home layout
title_zh-CN: 主页布局 (home)
toc: true
categories:
  - layouts
---

## Home 主页

主页就是博客的首页，我们推荐用`SakuraHomeLayout`组件快速搭建首页

```vue
<template>
  <Layout>
    <SakuraHomeLayout>
      <template #content>
        <RouterView />
      </template>
    </SakuraHomeLayout>
  </Layout>
</template>
```

<!-- <HomeLayout /> -->

## 相关组件

- [Layout](/components/layout)
- [SakuraHomeLayout](/components-layout/SakuraHomeLayout)
