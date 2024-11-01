<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <article class="sakura-page items-center" flex="~ col">
    <slot name="header">
      <SakuraPageHeader :fm="frontmatter" />
    </slot>

    <SakuraMultiColumns class="sakura-page-grid-layout">
      <template #left>
        <slot name="left" />
      </template>

      <template #content>
        <!-- This 'content' cannot be change. For more information, see https://github.com/YunYouJun/valaxy/blob/a7d24dfabb1022e20ec12bb1938fd272fd1e19e6/packages/valaxy/client/composables/outline/anchor.ts#L42 -->
        <div class="content sakura-page-content grid">
          <slot name="content" />
          <slot />
        </div>
      </template>

      <template #right>
        <slot name="right" />
      </template>
    </SakuraMultiColumns>
  </article>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-page {
  &-content {
    background: var(--sakura-bg-color);
    border-radius: var(--sakura-border-radius);
    padding: 0 30px;
  }

  &-grid-layout {
    @include screen('md') {
      grid-template-columns: 150px 1fr 150px;
    }

    @include screen('lg') {
      grid-template-columns: 250px 1fr 250px;
    }
  }
}
</style>
