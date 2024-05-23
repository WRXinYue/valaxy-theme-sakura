---
title: home layout
title_zh-CN: 主页布局 (home)
toc: true
categories:
  - layouts
---

## Home 主页

主页就是博客的首页，在首页当中如下是Home页的默认配置

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
- [SakuraHomeLayout](/components-layout/sakura-home-layout)
