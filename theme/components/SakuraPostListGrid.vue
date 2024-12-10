<script setup lang="ts">
import type { Post } from 'valaxy'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  posts: Post[]
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)

const posts = computed(() => props.posts)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof posts.value)
  posts.value.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
</script>

<template>
  <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
    <div v-for="items, idx of parts" :key="idx" flex="~ col gap-4">
      <SakuraPostGrid
        v-for="({ excerpt, date, cover, path, title }, index) of items" :id="`sakura-post-${index * parts.length + idx}`" :key="date" :link="path" :date="date" :src="cover"
        :title="title" :excerpt="excerpt" class="sakura-post slide-enter" :style="{ '--enter-stage': idx + 1 }"
      />
    </div>
  </div>
</template>
