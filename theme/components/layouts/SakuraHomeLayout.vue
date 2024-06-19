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

  <SakuraMultiColumnsLayout class="sakura-home-layout">
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

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;
.sakura-home-layout {
  @include screen('md') {
    padding: 0 40px;
  }

  @include screen('lg') {
    padding: 0 110px;
  }

  @include screen('xl') {
    padding: 0;
  }

  &.grid-layout-triple-columns {
    @include screen('md') {
      grid-template-columns: 0 1fr 0;
    }

    @include screen('lg') {
      grid-template-columns: 0 1fr 0;
    }

    @include screen('xl') {
      grid-template-columns: 250px 1fr 250px;
    }
  }
}
</style>
