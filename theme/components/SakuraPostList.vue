<script setup lang="ts">
import type { Post } from 'valaxy'
import type { CSSProperties } from 'vue'
import type { ResponsiveBreakpoints } from '../types'
import { breakpointsTailwind, useBreakpoints, useEventListener, usePreferredReducedMotion, useStorage } from '@vueuse/core'
import { useCategories, useValaxyI18n } from 'valaxy'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePostList, useThemeConfig } from '../composables'

const props = defineProps<{
  icon?: string
  text?: string
  posts?: Post[]
  responsive?: ResponsiveBreakpoints
  column?: number
  showCategories?: boolean
}>()

const themeConfig = useThemeConfig()
const breakpoints = useBreakpoints(breakpointsTailwind)
const { locale, t } = useI18n()
const { $tCategory } = useValaxyI18n()

const isImageReversed = computed(() => themeConfig.value.postList?.isImageReversed)

const icon = computed(() => props.icon ?? themeConfig.value.ui.postList?.icon)
const text = computed(() => props.text ?? themeConfig.value.postList?.text)
const responsive = computed(() => props.responsive || themeConfig.value.postList?.responsive || {})

const categoryList = useCategories()
const selectedCategory = defineModel<string>('category', { default: 'All' })
const displayedCategory = ref(selectedCategory.value)
const postsList = usePostList({}, () => props.showCategories && displayedCategory.value !== 'All')
const posts = computed(() => props.posts || postsList.value)
const allLabel = computed(() => locale.value.startsWith('zh')
  ? '全部'
  : 'All')

const categoryTabs = computed(() => {
  const order = themeConfig.value.postList?.categoryOrder ?? []
  const priority = new Map(order.map((name, index) => [name, index]))
  const categories = Array.from(categoryList.value.children.values())
    .filter(category => category.total > 0)
    .sort((a, b) => (priority.get(a.name) ?? order.length) - (priority.get(b.name) ?? order.length))
    .map(category => ({
      name: category.name,
      label: category.name === 'Uncategorized'
        ? t('category.uncategorized')
        : $tCategory(category.name),
      total: category.total,
    }))

  return [
    { name: 'All', label: allLabel.value, total: categoryList.value.total },
    ...categories,
  ]
})

const visiblePosts = computed(() => {
  if (!props.showCategories || displayedCategory.value === 'All')
    return posts.value
  return posts.value.filter((post) => {
    const categories = Array.isArray(post.categories)
      ? post.categories
      : post.categories
        ? [post.categories]
        : []
    return (categories[0] || 'Uncategorized') === displayedCategory.value
  })
})

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

const viewport = ref<HTMLElement | null>(null)
const layoutOptions = [
  { mode: 'grid' as const, icon: 'i-ri-grid-fill', label: '网格布局' },
  { mode: 'list' as const, icon: 'i-ri-list-unordered', label: '列表布局' },
]

const gridStyle = computed<CSSProperties>(() => ({
  'grid-template-columns': `repeat(${cols.value}, minmax(0, 1fr))`,
}))

const reducedMotion = usePreferredReducedMotion()
const switching = ref(false)
const animations = new Set<Animation>()
let revision = 0

function stopMorph() {
  revision++
  for (const animation of animations)
    animation.cancel()
  animations.clear()
  viewport.value?.style.removeProperty('height')
  switching.value = false
}

// Change the result set between fades. A newer click takes over the current
// opacity, while the selected tab always reflects the latest input immediately.
const filtering = ref(false)
const animatePosts = computed(() => !filtering.value && reducedMotion.value !== 'reduce')
let categoryFade: Animation | undefined

function finishCategoryChange() {
  categoryFade?.cancel()
  categoryFade = undefined
  displayedCategory.value = selectedCategory.value
  filtering.value = false
}

watch(selectedCategory, (name) => {
  stopMorph()
  const frame = viewport.value
  if (!frame?.animate || reducedMotion.value === 'reduce') {
    finishCategoryChange()
    return
  }

  const opacity = getComputedStyle(frame).opacity
  categoryFade?.cancel()
  filtering.value = true

  function reveal(from: string) {
    const fadeIn = frame!.animate([
      { opacity: from },
      { opacity: 1 },
    ], {
      duration: 150,
      easing: 'ease-out',
    })
    categoryFade = fadeIn
    fadeIn.onfinish = () => {
      if (categoryFade === fadeIn)
        finishCategoryChange()
    }
  }

  if (name === displayedCategory.value) {
    reveal(opacity)
    return
  }

  const fade = frame.animate([
    { opacity },
    { opacity: 0 },
  ], { duration: 90, fill: 'forwards' })
  categoryFade = fade
  fade.onfinish = async () => {
    if (fade !== categoryFade)
      return
    displayedCategory.value = name
    await nextTick()
    if (fade === categoryFade) {
      fade.cancel()
      reveal('0')
    }
  }
})

watch(reducedMotion, (value) => {
  if (value === 'reduce')
    finishCategoryChange()
})
onBeforeUnmount(finishCategoryChange)

const timing: KeyframeAnimationOptions = {
  duration: 440,
  fill: 'forwards',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
}

function animate(element: HTMLElement, frames: Keyframe[]) {
  const animation = element.animate(frames, timing)
  animations.add(animation)
  return animation
}

// The intermediate rectangle uses the grid column and the list row. Cards
// sharing a row separate vertically before they occupy the same horizontal space.
function animateCard(shell: HTMLElement, card: HTMLElement, first: DOMRect, last: DOMRect, toList: boolean) {
  const middle = toList
    ? new DOMRect(first.x, last.y, first.width, last.height)
    : new DOMRect(last.x, first.y, last.width, first.height)
  const rects = [first, middle, last]
  const translate = (rect: DOMRect) => `translate(${rect.x - last.x}px, ${rect.y - last.y}px)`

  animate(shell, rects.map(rect => ({
    transform: `${translate(rect)} scale(${rect.width / last.width}, ${rect.height / last.height})`,
  })))
  animate(card, rects.map(rect => ({
    transform: translate(rect),
    clipPath: `inset(0 ${Math.max(0, last.width - rect.width)}px ${Math.max(0, last.height - rect.height)}px 0 round var(--sakura-post-card-rd))`,
  })))
}

async function setLayout(mode: 'list' | 'grid') {
  if (layoutMode.value === mode)
    return

  if (filtering.value) {
    finishCategoryChange()
    await nextTick()
  }
  const frame = viewport.value
  const grid = frame?.querySelector<HTMLElement>('.post-list-container')
  const shells = Array.from(grid?.querySelectorAll<HTMLElement>(':scope > .article-list > .post-morph-shell') ?? [])
  if (!frame || !grid || !shells.length || reducedMotion.value === 'reduce'
    || !frame.animate || props.column || !breakpoints.md.value || responsiveCols.value === 1) {
    stopMorph()
    layoutMode.value = mode
    return
  }

  // Read the displayed shells before cancelling, including on a mid-flight reversal.
  const first = shells.map(shell => shell.getBoundingClientRect())
  const oldHeight = frame.getBoundingClientRect().height
  stopMorph()
  const token = revision
  frame.style.height = `${oldHeight}px`
  switching.value = true
  layoutMode.value = mode
  await nextTick()
  if (revision !== token)
    return

  const toList = mode === 'list'
  const last = shells.map(shell => shell.getBoundingClientRect())
  const newHeight = grid.getBoundingClientRect().height
  for (const [i, shell] of shells.entries()) {
    const card = shell.nextElementSibling
    if (card instanceof HTMLElement && last[i].width && last[i].height)
      animateCard(shell, card, first[i], last[i], toList)
  }
  // Only the outer frame changes flow height. The grid inside lays out at its
  // final size so pagination follows without rewrapping article text each frame.
  const height = animate(frame, [
    oldHeight,
    toList ? newHeight : oldHeight,
    newHeight,
  ]
    .map(value => ({ height: `${value}px` })))
  height.onfinish = () => {
    if (revision === token)
      stopMorph()
  }
}

watch([
  visiblePosts,
  responsiveCols,
  reducedMotion,
  () => props.column,
], stopMorph)
useEventListener('resize', stopMorph)
onBeforeUnmount(stopMorph)

// 首帧不播放滑块位移动画，避免刷新时从左侧滑入
const toggleReady = ref(false)
onMounted(() => requestAnimationFrame(() => {
  toggleReady.value = true
}))
</script>

<template>
  <div class="sakura-post-list">
    <div v-if="showCategories" class="sakura-post-categories">
      <div class="sakura-post-category-tabs" role="tablist">
        <button
          v-for="category in categoryTabs"
          :key="category.name"
          class="sakura-post-category-tab"
          :class="{ 'is-active': selectedCategory === category.name }"
          type="button"
          role="tab"
          :aria-selected="selectedCategory === category.name"
          @click="selectedCategory = category.name"
        >
          <span class="sakura-post-category-name">{{ category.label }}</span>
          <span class="sakura-post-category-count">{{ category.total }}</span>
        </button>
      </div>
      <div class="layout-toggle" role="group" aria-label="切换文章列表布局">
        <div class="layout-toggle-thumb" :class="{ 'is-list': layoutMode === 'list', 'is-ready': toggleReady }" />
        <button
          v-for="option in layoutOptions"
          :key="option.mode"
          type="button"
          class="layout-toggle-btn"
          :class="{ 'is-active': layoutMode === option.mode }"
          :aria-label="option.label"
          :aria-pressed="layoutMode === option.mode"
          :title="option.label"
          @click="setLayout(option.mode)"
        >
          <div :class="option.icon" class="toggle-icon" />
        </button>
      </div>
    </div>
    <SakuraDivider v-else :icon :text>
      <div class="layout-toggle" role="group" aria-label="切换文章列表布局">
        <div class="layout-toggle-thumb" :class="{ 'is-list': layoutMode === 'list', 'is-ready': toggleReady }" />
        <button
          v-for="option in layoutOptions"
          :key="option.mode"
          type="button"
          class="layout-toggle-btn"
          :class="{ 'is-active': layoutMode === option.mode }"
          :aria-label="option.label"
          :aria-pressed="layoutMode === option.mode"
          :title="option.label"
          @click="setLayout(option.mode)"
        >
          <div :class="option.icon" class="toggle-icon" />
        </button>
      </div>
    </SakuraDivider>
    <div ref="viewport" :class="{ 'is-layout-switching': switching }">
      <TransitionGroup
        name="post-list"
        :css="animatePosts"
        :move-class="switching || !animatePosts ? 'post-layout-static' : 'post-list-move'"
        tag="div"
        :style="gridStyle"
        class="post-list-container"
        grid="~ gap-x-4 gap-y-5 md:gap-y-7"
      >
        <div
          v-for="(post, index) of visiblePosts"
          :id="`article-${index}`"
          :key="post.path || index"
          class="article-list"
        >
          <div aria-hidden="true" class="post-morph-shell" />
          <SakuraPostCard
            :cols
            :position="(index % 2 === (isImageReversed ? 1 : 0) ? 'left' : 'right')"
            :post
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-list-move {
  transition: transform 220ms ease-out;
}

.post-list-enter-active {
  transition: opacity 150ms ease-out;
}

.post-list-enter-from {
  opacity: 0;
}

.article-list {
  position: relative;
  display: grid;
  min-width: 0;
}

.article-list.post-list-leave-active {
  display: none;
}

.post-morph-shell {
  position: absolute;
  inset: 0;
  visibility: hidden;
  pointer-events: none;
  background: var(--sakura-post-card-bg);
  border-radius: var(--sakura-post-card-rd);
  transform-origin: top left;
}

.is-layout-switching {
  overflow: clip;
  overflow-anchor: none;

  .post-morph-shell {
    visibility: visible;
  }
}

.sakura-post-categories {
  --post-control-height: 36px;

  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 24px;
  margin-bottom: 30px;
}

.sakura-post-category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 0;
}

.sakura-post-category-tab {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  height: var(--post-control-height);
  padding: 0 6px 0 15px;
  color: var(--sakura-color-text);
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--sakura-color-divider);
  border-radius: 999px;
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    color: var(--sakura-color-primary);
    border-color: var(--sakura-color-primary);
  }

  &.is-active {
    color: var(--sakura-color-background);
    background: var(--sakura-color-text);
    border-color: var(--sakura-color-text);
  }
}

.sakura-post-category-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 7px;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  background: var(--sakura-color-hover);
  border-radius: 999px;
  transition:
    color 0.25s ease,
    background-color 0.25s ease;
}

.sakura-post-category-tab.is-active .sakura-post-category-count {
  color: oklch(100% 0 0);
  background: var(--sakura-color-primary);
}

.layout-toggle {
  --layout-toggle-gap: 2px;
  --layout-toggle-padding: 3px;
  --layout-toggle-size: calc(var(--post-control-height, 42px) - 2 * var(--layout-toggle-padding) - 2px);

  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--layout-toggle-gap);
  padding: var(--layout-toggle-padding);
  margin-left: auto;
  background: var(--sakura-color-background);
  border: 1px solid var(--sakura-color-divider);
  border-radius: 999px;
}

.layout-toggle-thumb {
  position: absolute;
  top: var(--layout-toggle-padding);
  left: var(--layout-toggle-padding);
  z-index: 0;
  width: var(--layout-toggle-size);
  height: var(--layout-toggle-size);
  background: var(--sakura-color-text);
  border-radius: 50%;
  box-shadow:
    0 1px 2px oklch(0% 0 0 / 14%),
    0 2px 6px oklch(0% 0 0 / 10%);
  will-change: transform;

  &.is-ready {
    transition:
      transform 0.52s cubic-bezier(0.32, 1.28, 0.52, 1),
      background-color 0.3s ease;
  }

  &.is-list {
    transform: translateX(calc(var(--layout-toggle-size) + var(--layout-toggle-gap)));
  }
}

.layout-toggle-btn {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--layout-toggle-size);
  height: var(--layout-toggle-size);
  padding: 0;
  color: var(--sakura-color-text);
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: 50%;
  transition:
    color 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.32s ease;

  .toggle-icon {
    font-size: 1.15rem;
    opacity: 0.65;
    transition:
      opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.42s cubic-bezier(0.32, 1.5, 0.56, 1);
  }

  &:active .toggle-icon {
    transform: scale(0.86);
    transition-duration: 0.12s;
  }

  &.is-active {
    color: var(--sakura-color-background);

    .toggle-icon {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:hover:not(.is-active) {
    background-color: var(--sakura-color-hover);

    .toggle-icon {
      opacity: 0.9;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .post-list-move,
  .post-list-enter-active,
  .layout-toggle-thumb.is-ready,
  .layout-toggle-btn,
  .layout-toggle-btn .toggle-icon {
    transition: none;
  }
}
</style>
