<script lang="ts" setup>
import type { Post } from 'valaxy'
import type SakuraImageCard from './SakuraImageCard.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  post: Post
  position: 'left' | 'right'
  cols: number
}>()

const themeConfig = useThemeConfig()
const { md: isDesktop } = useBreakpoints(breakpointsTailwind, { ssrWidth: 0 })

const imageCard = computed(() => themeConfig.value.ui.postList?.image)

const coverCard = ref<InstanceType<typeof SakuraImageCard>>()

function onTitleClick(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest('a[data-post-title]'))
    coverCard.value?.onCoverClick(event)
}

const isGroup = computed(() => props.cols > 1)
const isCol = computed(() => !isDesktop.value || isGroup.value)
</script>

<template>
  <article
    data-post-card
    class="sakura-card sakura-post-card"
    :class="[position, { 'is-col': isCol }, { group: isGroup }]"
  >
    <SakuraImageCard
      ref="coverCard"
      post-transition
      class="post-card-image aspect-video"
      :to="post.path"
      :post
      v-bind="imageCard"
    />

    <div flex="~ col" class="post-card-content has-cover" @click.capture="onTitleClick">
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
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 220ms ease-out;

  .post-card-content {
    padding: 20px 39px;
  }

  @at-root html.dark & {
    border-color: var(--sakura-color-divider);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: color-mix(in srgb, var(--sakura-color-primary) 28%, transparent);
      box-shadow: 0 4px 12px oklch(0% 0 0 / 14%);
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
      border-radius: var(--sakura-post-card-rd) var(--sakura-post-card-rd) 0 0;
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

    &.left .sakura-image-card {
      border-radius: 0 var(--sakura-post-card-rd) var(--sakura-post-card-rd) 0;
    }

    &.right .sakura-image-card {
      border-radius: var(--sakura-post-card-rd) 0 0 var(--sakura-post-card-rd);
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
