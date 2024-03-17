<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()

const articleContentElement = ref<HTMLElement | null>(null)
const asideHeight = computed(() => articleContentElement.value?.clientHeight)
</script>

<template>
  <article>
    <SakuraPageHeader :title="frontmatter.title ?? 'Default Title'" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />
    <!-- :class="themeConfig.animation && 'element-slide-up'" -->

    <main class="flex justify-center">
      <div
        class="divide-y xl:divide-y-0  divide-gray-200 dark:divide-gray-700 pb-16"
        style="grid-template-rows: auto 1fr"
      >
        <StarterAuthor v-if="frontmatter.author" :frontmatter="frontmatter" />

        <div ref="articleContentElement" class="article-content w-1000px rd-$st-c-rd py-2 divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
          <slot />
        </div>

        <sakuraArticleFooter />
      </div>

      <slot name="aside">
        <SakuraAside :style="{ height: `${asideHeight}px` }">
          <slot name="aside-custom" />
        </SakuraAside>
      </slot>
    </main>
  </article>
</template>

<style lang="scss">
.article-content {
  background: var(--va-c-bg);
}
</style>
