<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <article>
    <SakuraPageHeader :title="frontmatter.title ?? 'Default Title'" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />
    <!-- :class="themeConfig.animation && 'element-slide-up'" -->

    <div class="container !max-w-screen-2xl lg:px-6 mx-auto pt-$header-height grid-layout min-w-0">
      <div />

      <div>
        <StarterAuthor v-if="frontmatter.author" :frontmatter="frontmatter" />

        <!-- This 'content' cannot be change. For more information, see https://github.com/YunYouJun/valaxy/blob/a7d24dfabb1022e20ec12bb1938fd272fd1e19e6/packages/valaxy/client/composables/outline/anchor.ts#L42 -->
        <div class="content grid divide-y divide-gray-200 dark:divide-gray-700 px-30px">
          <slot />
        </div>
      </div>

      <slot name="aside">
        <SakuraAside />
      </slot>
    </div>
  </article>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.article-content {
  background: var(--va-c-bg);
  border-radius: var(--st-c-rd);
}

.grid-layout {
  grid-template-columns: 0 1fr 0;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0px 12px;

  @include screen('md') {
    grid-template-columns: 250px 1fr 250px;
  }
}
</style>
