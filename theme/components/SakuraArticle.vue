<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <article>
    <SakuraPageHeader :title="frontmatter.title ?? 'Default Title'" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />
    <!-- :class="themeConfig.animation && 'element-slide-up'" -->

    <div class="divide-y xl:divide-y-0  divide-gray-200 dark:divide-gray-700 pb-8 max-w-1000px mx-auto">
      <StarterAuthor v-if="frontmatter.author" :frontmatter="frontmatter" />

      <div class="article-content divide-y divide-gray-200 dark:divide-gray-700 px-30px">
        <slot />
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.article-content {
  background: var(--va-c-bg);
  border-radius: var(--st-c-rd);
}
</style>
