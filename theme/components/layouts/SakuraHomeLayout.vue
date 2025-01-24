<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <slot name="hero">
    <SakuraHero />
  </slot>

  <div class="sakura-home" flex="~ col center">
    <SakuraMultiColumns class="sakura-safe-padding sakura-home-layout site-content" base>
      <slot name="notice-board">
        <SakuraNoticeBoard />
      </slot>

      <slot name="post-pinned">
        <SakuraPinnedPost v-if="themeConfig.pinnedPost" />
      </slot>

      <slot name="post-list">
        <SakuraPostList />
      </slot>

      <template v-if="$slots.right" #right>
        <slot name="right" />
      </template>
      <!-- <template v-else #right>
        <SakuraSiteInfoCard style="margin-top: 24px;" />
        <div>
          公告
        </div>
        <div>
          文檔目錄
        </div>
        <div>
          最新文章
        </div>
        <div>
          分类
        </div>
        <div>
          标签
        </div>
        <div>
          归档
        </div>
      </template> -->

      <template v-if="$slots.left" #left>
        <slot name="left" />
      </template>
    </SakuraMultiColumns>

    <slot name="pagination">
      <SakuraPagination />
    </slot>
  </div>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-home-layout {
  &.sakura-triple-columns {
    @include screen('md') {
      // grid-template-columns: 1fr;
      grid-template-columns: 0 1fr 0;
    }

    @include screen('lg') {
      // grid-template-columns: 0 1fr 0;
      grid-template-columns: 1fr 800px 1fr;
    }

    @include screen('xl') {
      // grid-template-columns: 250px 1fr 250px;
      grid-template-columns: 1fr 800px 1fr;
    }
  }

  &.sakura-two-columns-right {
    aside {
      display: none;
    }

    // gap TODO:

    @include screen('md') {
      // grid-template-columns: 1fr;
      grid-template-columns: 1fr 0;
    }

    @include screen('lg') {
      // grid-template-columns: 0 1fr 0;
      grid-template-columns: 1fr 280px;

      aside {
        display: inline-block;
      }
    }

    @include screen('xl') {
      // grid-template-columns: 250px 1fr 250px;
      grid-template-columns: 800px 280px;
    }

    @include mobile {
      gap: 0;
    }
  }

  &.sakura-one-columns {
    grid-template-columns: minmax(0, 800px);
  }
}
</style>
