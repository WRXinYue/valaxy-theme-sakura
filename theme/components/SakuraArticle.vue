<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFrontmatter, usePostList } from 'valaxy'
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
const frontmatter = useFrontmatter()

const route = useRoute()
const posts = usePostList()

const nextPost = computed(() => posts.value[findCurrentIndex() - 1])
const prevPost = computed(() => posts.value[findCurrentIndex() + 1])

function findCurrentIndex() {
  return posts.value.findIndex(p => p.path === route.path)
}
</script>

<template>
  <article>
    <SakuraPageHeader :title="frontmatter.title ?? 'Default Title'" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />

    <div
      class="divide-y xl:divide-y-0  divide-gray-200 dark:divide-gray-700 pb-16 mx-0 md:mx-15 lg:mx-40 xl:mx-60 2xl:mx-80"
      :class="themeConfig.animation && 'element-slide-up'"
      style="grid-template-rows: auto 1fr"
    >
      <StarterAuthor v-if="frontmatter.author" :frontmatter="frontmatter" />
      <div class="article-content rd-$st-c-rd px-15 py-2 divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
        <slot />
      </div>

      <footer class="article-footer text-sm font-medium leading-5 divide-y divide-gray-200 dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
        <div v-if="nextPost && nextPost.path" class="py-8">
          <h2 class="text-xs tracking-wide uppercase text-gray-500">
            Next Article
          </h2>
          <div class="link">
            <RouterLink :to="nextPost.path">
              {{ nextPost.title }}
            </RouterLink>
          </div>
        </div>
        <div v-if="prevPost && prevPost.path" class="py-8">
          <h2 class="text-xs tracking-wide uppercase text-gray-500">
            Previous Article
          </h2>
          <div class="link">
            <RouterLink :to="prevPost.path">
              {{ prevPost.title }}
            </RouterLink>
          </div>
        </div>
        <div class="pt-8">
          <RouterLink class="link" to="/">
            ← Back to the blog
          </RouterLink>
        </div>
      </footer>
    </div>
  </article>
</template>

<style lang="scss">
.article-content {
  background: var(--va-c-bg);
}
</style>
