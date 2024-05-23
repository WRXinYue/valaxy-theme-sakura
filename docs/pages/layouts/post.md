---
title: post layout
title_zh-CN: 文章布局 (post)
categories:
  - layouts
---

## 文章布局 post

在文章页内部包含组件无需太大关注，`YunSponsor`及`ValaxyCopyright`是通过配置项来触发是否展示的

比如我们在这里想要自定义`SakuraArticleFooter`组件，但是不想修改这个布局文件，需要先新增`SakuraArticleFooterCustom`组件替换修改即可

```vue
<template>
  <Layout>
    <SakuraArticle>
      <RouterView v-slot="{ Component }">
        <component :is="Component">
          <template #main-content-after>
            <YunSponsor v-if="showSponsor" />
            <ValaxyCopyright v-if="frontmatter.copyright || siteConfig.license.enabled" :url="url" />
          </template>
          <template #footer>
            <SakuraArticleFooterCustom />
          </template>
        </component>
      </RouterView>
    </SakuraArticle>
  </Layout>
</template>
```

## 相关组件

- [Layout](/components/layout)
- SakuraArticle <!-- TODO: -->
- YunSponsor <!-- TODO: -->
- ValaxyCopyright <!-- TODO: -->
- [SakuraArticleFooterCustom](/components-themes/SakuraArticleFooterCustom)
