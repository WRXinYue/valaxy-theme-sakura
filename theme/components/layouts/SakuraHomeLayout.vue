<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <slot name="banner">
    <SakuraBannerCustom />
  </slot>

  <SakuraMultiColumnsLayout>
    <slot name="notice-board">
      <SakuraNoticeBoardCustom />
    </slot>

    <slot name="article-pinned">
      <SakuraArticlePinnedCustom v-if="themeConfig.articlePinned" />
    </slot>

    <slot name="article-list">
      <SakuraArticleListCustom />
    </slot>

    <slot name="pagination">
      <SakuraPaginationCustom />
    </slot>

    <template #right>
      <slot name="right" />
    </template>

    <template #left>
      <slot name="left" />
    </template>
  </SakuraMultiColumnsLayout>
</template>
