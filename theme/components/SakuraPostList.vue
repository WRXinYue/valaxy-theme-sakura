<script setup lang="ts">
import type { Post } from 'valaxy'
import type { CSSProperties } from 'vue'
import type { ResponsiveBreakpoints } from '../types'
import { breakpointsTailwind, useBreakpoints, useStorage } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { usePostList, useThemeConfig } from '../composables'

const props = defineProps<{
  icon?: string
  text?: string
  posts?: Post[]
  responsive?: ResponsiveBreakpoints
  column?: number
}>()

const themeConfig = useThemeConfig()
const postsList = usePostList()
const breakpoints = useBreakpoints(breakpointsTailwind)

const isImageReversed = computed(() => themeConfig.value.postList?.isImageReversed)

const icon = computed(() => props.icon ?? themeConfig.value.ui.postList?.icon)
const text = computed(() => props.text ?? themeConfig.value.postList?.text)
const posts = computed(() => props.posts || postsList.value)
const responsive = computed(() => props.responsive || themeConfig.value.postList?.responsive || {})

const layoutMode = useStorage<'list' | 'grid'>('valaxy-sakura-post-list-layout', 'grid')

const responsiveCols = computed(() => {
  const keys: (keyof typeof breakpointsTailwind)[] = ['2xl', 'xl', 'lg', 'md', 'sm']
  for (const key of keys) {
    if (breakpoints[key].value && responsive.value[key]) {
      return responsive.value[key]
    }
  }
  return 1
})

const cols = computed(() => {
  if (props.column)
    return props.column

  // Mobile always 1 column
  if (!breakpoints.md.value)
    return 1

  if (layoutMode.value === 'list')
    return 1

  return responsiveCols.value
})

const animatingWidth = ref<string | undefined>(undefined)
const animatingContentWidth = ref<string | undefined>(undefined)
const containerRef = ref<any>(null)
const isShrinking = ref(false)
const cardCols = ref(cols.value)

watch(cols, (val) => {
  cardCols.value = val
})

function toggleLayout() {
  if (cols.value === 1) {
    // List -> Grid (Shrinking)
    const card = document.querySelector('.sakura-post-card')
    if (card) {
      // 1. Lock current large width
      const width = card.getBoundingClientRect().width
      animatingWidth.value = `${width}px`
      isShrinking.value = true
    }

    layoutMode.value = 'grid'

    nextTick(() => {
      // 2. Animate to grid width
      // We calculate target width roughly or just set to undefined if transition works?
      // Since we want to animate width, we need a target value.
      // If we set to undefined, it snaps to auto. CSS transition to auto is tricky.
      // But if we calculate the target grid width:
      if (containerRef.value?.$el) {
        const containerWidth = containerRef.value.$el.getBoundingClientRect().width
        // Assuming 3 columns or responsiveCols.value
        const gap = 16 // md:gap-y-7 is vertical, gap-x-4 is horizontal (16px)
        const columns = responsiveCols.value
        const targetWidth = (containerWidth - (columns - 1) * gap) / columns

        // Force reflow
        // setTimeout to ensure the initial 'lock' frame is rendered?
        // Actually animatingWidth was set BEFORE layout change.

        setTimeout(() => {
          animatingWidth.value = `${targetWidth}px`
        }, 0)

        setTimeout(() => {
          animatingWidth.value = undefined
          isShrinking.value = false
        }, 500)
      }
      else {
        // Fallback if no container
        animatingWidth.value = undefined
        isShrinking.value = false
      }
    })
  }
  else {
    // Grid -> List (Expanding)
    isShrinking.value = false
    // Before switching to List, measure current width
    const card = document.querySelector('.sakura-post-card')
    if (card) {
      const width = card.getBoundingClientRect().width
      animatingWidth.value = `${width}px`
    }

    if (containerRef.value?.$el) {
      const width = containerRef.value.$el.getBoundingClientRect().width
      animatingContentWidth.value = `${width}px`
    }

    layoutMode.value = 'list'

    // Release width constraint after render to allow transition
    nextTick(() => {
      // Start expanding immediately but smoothly
      setTimeout(() => {
        animatingWidth.value = '100%'
      }, 0)

      // Cleanup after transition
      setTimeout(() => {
        animatingWidth.value = undefined
        animatingContentWidth.value = undefined
      }, 500)
    })
  }
}

const showGridIcon = computed(() => cols.value === 1)

const breakpointsStyle = computed<CSSProperties>(() => {
  return { 'grid-template-columns': `repeat(${cols.value}, minmax(0, 1fr))` }
})
</script>

<template>
  <div class="sakura-post-list">
    <SakuraDivider :icon :text>
      <div class="layout-toggle" @click="toggleLayout">
        <div v-if="showGridIcon" i-ri-grid-fill class="toggle-icon" />
        <div v-else i-ri-list-unordered class="toggle-icon" />
      </div>
    </SakuraDivider>
    <TransitionGroup
      ref="containerRef"
      name="post-list"
      tag="div"
      :style="breakpointsStyle"
      class="post-list-container"
      grid="~ gap-x-4 gap-y-5 md:gap-y-7"
    >
      <SakuraPostCard
        v-for="(post, index) of posts"
        :id="`article-${index}`"
        :key="post.path || post.title || index"
        :cols="cardCols"
        class="article-list"
        :style="isShrinking ? { width: animatingWidth, zIndex: 10 } : { maxWidth: animatingWidth }"
        :content-style="{ minWidth: animatingContentWidth ? `calc(${animatingContentWidth} - var(--sakura-post-card-img-width))` : undefined }"
        :position="(index % 2 === (isImageReversed ? 1 : 0) ? 'left' : 'right')"
        :post
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.post-list-leave-active {
  position: absolute;
}

.layout-toggle {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--sakura-color-hover);
  }

  .toggle-icon {
    font-size: 1.5rem;
    color: var(--sakura-color-text);
  }
}
</style>
