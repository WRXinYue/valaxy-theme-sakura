<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <slot name="hero">
    <SakuraHero />
  </slot>

  <SakuraMultiColumns class="sakura-home-layout">
    <slot name="notice-board">
      <SakuraNoticeBoard />
    </slot>

    <slot name="post-pinned">
      <SakuraPinnedPost v-if="themeConfig.pinnedPost" />
    </slot>

    <slot name="post-list">
      <SakuraPostList />
    </slot>

    <slot name="pagination">
      <SakuraPagination />
    </slot>

    <template #right>
      <slot name="right" />
    </template>

    <template #left>
      <slot name="left" />
    </template>
  </SakuraMultiColumns>
</template>

<style lang="scss" scoped>
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

  &.sakura-triple-columns {
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
