<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <article>
    <SakuraPageHeader :title="frontmatter.title ?? 'Default Title'" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />

    <SakuraMultiColumnsLayout class="grid-layout mx-auto min-w-0 pt-$header-height container !max-w-screen-2xl lg:px-6">
      <template #left>
        <slot name="left" />
      </template>

      <template #content>
        <!-- This 'content' cannot be change. For more information, see https://github.com/YunYouJun/valaxy/blob/a7d24dfabb1022e20ec12bb1938fd272fd1e19e6/packages/valaxy/client/composables/outline/anchor.ts#L42 -->
        <div class="content article-content grid px-30px divide-y divide-gray-200 dark:divide-gray-700">
          <slot name="content" />
          <slot />
        </div>
      </template>

      <template #right>
        <slot name="right" />
      </template>
    </SakuraMultiColumnsLayout>
  </article>
</template>

<style lang="scss">
.article-content {
  background: var(--va-c-bg);
  border-radius: var(--st-c-rd);
}
</style>
