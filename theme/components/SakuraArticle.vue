<script setup lang="ts">
import { useFrontmatter } from 'valaxy'
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
const frontmatter = useFrontmatter()
</script>

<template>
  <article>
    <SakuraPageHeader :title="frontmatter.title ?? 'Default Title'" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />

    <div
      class="article-width divide-y xl:divide-y-0  divide-gray-200 dark:divide-gray-700 pb-16"
      :class="themeConfig.animation && 'element-slide-up'"
      style="grid-template-rows: auto 1fr"
    >
      <StarterAuthor v-if="frontmatter.author" :frontmatter="frontmatter" />
      <div class="article-content rd-$st-c-rd py-2 divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
        <slot />
      </div>

      <sakuraArticleFooter />
    </div>
  </article>
</template>

<style lang="scss">
.article-content {
  background: var(--va-c-bg);
}
</style>
