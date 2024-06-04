<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <SakuraBannerCustom />

  <div class="grid-layout container !max-w-screen-2xl lg:px-6 mx-auto pt-$header-height min-w-0">
    <div />

    <div class="md:w-800px m-auto min-w-300px">
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

      <slot name="content" />
    </div>

    <div />
  </div>
</template>
