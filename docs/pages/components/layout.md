---
title: Layout
title_zh-CN: Layout
toc: true
categories:
  - components
---

## Layout

建议在每个布局的根节点使用 `Layout` 组件，并在其中嵌入所需页面。`Layout` 组件将自动包含 `SakuraFooterCustom` 页脚组件

## 示例

```vue
<template>
  <Layout>
    <RouterView />

    <template #nav-bar />

    <template #footer>
      <SakuraFooterCustom />
    </template>
  </Layout>
</template>
```

::: warning
推荐将 `nav-bar` 插槽移到 [App](/components-custom/App) 组件中使用，这样做适合于在各个页面中展示相同的导航栏并避免重复渲染。除非您想在不同页面显示不同导航栏
:::
