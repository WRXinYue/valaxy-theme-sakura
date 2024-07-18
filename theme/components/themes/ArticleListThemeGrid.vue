<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'
import { usePostList, useSiteConfig } from 'valaxy'
import type { Post } from 'valaxy'

import { useSakuraAppStore } from '../../stores'
import { useThemeConfig } from '../../composables'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), { })

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()
const pageSize = computed(() => themeConfig.value.pagination?.itemsPerPage || siteConfig.value.pageSize)

const routes = usePostList({ type: props.type || '' })
const posts = computed(() => props.posts || routes.value)
const curPage = computed(() => props.curPage || sakura.curPage || 1)

const displayedPosts = computed(() =>
  posts.value.slice(
    (curPage.value - 1) * pageSize.value,
    curPage.value * pageSize.value * sakura.loadMultiple,
  ),
)

const postsWithLimitedTags = computed(() => {
  return displayedPosts.value.map((post) => {
    if (post.tags && post.tags.length > 3)
      return { ...post, tags: post.tags.slice(0, 3) }

    return post
  })
})

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof postsWithLimitedTags.value)
  postsWithLimitedTags.value.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
</script>

<template>
  <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
    <div v-for="items, idx of parts" :key="idx" flex="~ col gap-4">
      <ArticleThemeGrid
        v-for="({ excerpt, date, cover, path, title }, index) of items" :id="`sakura-article-${index * parts.length + idx}`" :key="date" :link="path" :date="date" :src="cover"
        :title="title" :excerpt="excerpt" class="slide-enter sakura-article" :style="{ '--enter-stage': idx + 1 }"
      />
    </div>
  </div>
</template>
