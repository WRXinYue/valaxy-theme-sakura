<script setup lang="ts">
import type { Post } from 'valaxy'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { usePostList, useThemeConfig } from '../composables'
import type { ResponsiveBreakpoints } from '../types'

const props = defineProps<{
  icon?: string
  text?: string
  posts?: Post[]
  responsive?: ResponsiveBreakpoints
}>()

const themeConfig = useThemeConfig()
const postsList = usePostList()
const breakpoints = useBreakpoints(breakpointsTailwind)

const isImageReversed = computed(() => themeConfig.value.postList?.isImageReversed)

const icon = computed(() => props.icon ?? themeConfig.value.ui.postList?.icon)
const text = computed(() => props.text ?? themeConfig.value.postList?.text)
const posts = computed(() => props.posts || postsList.value)
const responsive = computed(() => props.responsive || themeConfig.value.ui.postList?.responsive || {})

const cols = computed(() => {
  const keys: (keyof typeof breakpointsTailwind)[] = ['2xl', 'xl', 'lg', 'md', 'sm']
  for (const key of keys) {
    if (breakpoints[key].value && responsive.value[key]) {
      return responsive.value[key]
    }
  }
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof posts.value)
  posts.value.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})

const breakpointsStyle = computed<CSSProperties>(() => {
  return { 'grid-template-columns': `repeat(${cols.value}, minmax(0, 1fr))` }
})
</script>

<template>
  <div class="sakura-post-list">
    <SakuraDivider :icon :text />
    <div :style="breakpointsStyle" class="post-list-container" grid="~ gap-4">
      <div v-for="items, idx of parts" :key="idx" class="post-list-section" flex="~ col" grid="gap-5 md:gap-7">
        <SakuraPostCard v-for="(post, index) of items" :id="`article-${index * parts.length + idx}`" :key="index" :cols class="article-list" :position="(index % 2 === (isImageReversed ? 1 : 0) ? 'left' : 'right')" :post />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-list-container,
.post-list-section {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}
</style>
