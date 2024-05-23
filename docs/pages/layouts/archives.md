---
title: archives layout
title_zh-CN: 归档布局 (archives)
categories:
  - layouts
---

## 归档布局 archives

```vue
<template>
  <Layout>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-header>
          <SakuraPageHeader :title="title || t('menu.archives')" :icon="frontmatter.icon || 'i-ri-archive-line'" :color="frontmatter.color" />
        </template>
        <template #main-content>
          <SakuraTimeLine :posts="site.postList" />
          <RouterView />
        </template>
      </component>
    </RouterView>
  </Layout>
</template>
```

## 相关组件

- [Layout](/components/layout)
- SakuraPageHeader <!-- TODO: -->
- SakuraTimeLine <!-- TODO: -->
