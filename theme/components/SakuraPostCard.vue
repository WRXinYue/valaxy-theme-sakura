<script lang="ts" setup>
import type { Post } from 'valaxy'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { resolveImage } from '../utils'

const props = defineProps<{
  post: Post
  position: 'left' | 'right'
  cols: number
  contentStyle?: any
}>()

const themeConfig = useThemeConfig()
const breakpoints = useBreakpoints(breakpointsTailwind)

const defaultImage = computed(() => themeConfig.value.postList && resolveImage(themeConfig.value.postList?.defaultImage))
const cover = computed(() => props.post.cover || defaultImage.value)
const imageCard = computed(() => themeConfig.value.ui.postList?.image)

const isGroup = computed(() => props.cols > 1)
const isCol = computed(() => !breakpoints.md.value || isGroup.value) // flex-direction: column;

const imageRef = ref<any>(null)
const contentRef = ref<HTMLElement | null>(null)

watch(isCol, async () => {
  const els: HTMLElement[] = []
  if (imageRef.value?.$el)
    els.push(imageRef.value.$el)
  if (contentRef.value)
    els.push(contentRef.value)

  const firsts = els.map(el => el.getBoundingClientRect())

  await nextTick()

  els.forEach((el, i) => {
    const first = firsts[i]
    const last = el.getBoundingClientRect()
    const dx = first.left - last.left
    const dy = first.top - last.top

    if (dx !== 0 || dy !== 0) {
      el.animate([
        { transform: `translate(${dx}px, ${dy}px)` },
        { transform: 'none' },
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.55, 0, 0.1, 1)',
      })
    }
  })
})
</script>

<template>
  <article
    hover="scale-101 z-10" class="sakura-card sakura-post-card"
    :class="[position, { 'is-col': isCol }, { group: isGroup }]"
  >
    <SakuraImageCard
      v-if="cover"
      ref="imageRef"
      class="post-card-image aspect-video"
      :to="post.path"
      :src="cover || defaultImage"
      v-bind="imageCard"
    />

    <div ref="contentRef" flex="~ col" class="post-card-content" :class="cover && 'has-cover'" :style="contentStyle">
      <slot>
        <SakuraPostCardInfo :post />
      </slot>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-post-card {
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  color: var(--sakura-color-text);
  background: var(--sakura-post-card-bg);
  min-height: var(--sakura-post-card-height);
  border-radius: var(--sakura-post-card-rd);
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

  .post-card-content {
    padding: 20px 39px;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .post-card-image {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  @at-root html.dark & {
    border-color: var(--sakura-color-divider);

    &:hover {
      border-color: var(--sakura-color-primary);
    }
  }

  &.is-col {
    flex-direction: column;
    justify-content: flex-start;

    .post-card-content {
      padding-inline: 20px;

      &.has-cover {
        width: 100%;
      }
    }

    .sakura-image-card {
      width: 100%;
    }
  }

  &:not(&.is-col) {
    height: var(--sakura-post-card-height);

    .post-card-content {
      padding: 20px 39px;

      &.has-cover {
        width: calc(100% - var(--sakura-post-card-img-width));
      }
    }

    &.left {
      flex-direction: row-reverse;
    }

    &.right {
      text-align: right;

      :deep(.sakura-post-meta.is-truncated) {
        justify-content: flex-end;
      }
    }
  }
}
</style>
