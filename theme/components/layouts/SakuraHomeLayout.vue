<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
const isMounted = useMounted()
</script>

<template>
  <slot name="banner">
    <SakuraBannerCustom />
  </slot>

  <SakuraMultiColumnsLayout>
    <slot name="notice-board">
      <SakuraNoticeBoardCustom v-if="isMounted" />
    </slot>

    <slot name="article-pinned">
      <SakuraArticlePinnedCustom v-if="isMounted && themeConfig.articlePinned" />
    </slot>

    <slot name="article-list">
      <SakuraArticleListCustom v-if="isMounted" />
    </slot>

    <slot name="pagination">
      <SakuraPaginationCustom v-if="isMounted" />
    </slot>

    <template #right>
      <slot name="right" />
    </template>

    <template #left>
      <slot name="left" />
    </template>
  </SakuraMultiColumnsLayout>
</template>
