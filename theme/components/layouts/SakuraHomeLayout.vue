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

    <template v-if="isMounted">
      <slot name="article-pinned">
        <SakuraArticlePinnedCustom v-if="themeConfig.articlePinned" />
      </slot>
    </template>

    <template v-if="isMounted">
      <slot name="article-list">
        <SakuraArticleListCustom />
      </slot>
    </template>

    <template v-if="isMounted">
      <slot name="pagination">
        <SakuraPaginationCustom />
      </slot>
    </template>

    <template v-if="isMounted" #right>
      <slot name="right" />
    </template>

    <template v-if="isMounted" #left>
      <slot name="left" />
    </template>
  </SakuraMultiColumnsLayout>
</template>
