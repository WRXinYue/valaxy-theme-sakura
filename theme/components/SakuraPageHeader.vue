<script lang="ts" setup>
import type { PostFrontMatter } from 'valaxy'
import type { SakuraImageCardProps } from '../types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  fm: PostFrontMatter
  imageCard?: SakuraImageCardProps
}>()

const themeConfig = useThemeConfig()
const route = useRoute()
const coverPost = computed(() => ({ ...props.fm, path: props.fm.path || route.path }))

const arrivalCover = computed(() => {
  // The clicked card has already picked a URL for array and random covers.
  return import.meta.env.SSR || history.state?.current !== route.fullPath
    ? undefined
    : history.state?.sakuraCover as string | null | undefined
})

const imageCard = computed(() => props.imageCard || themeConfig.value.ui.pageHeader?.image)
</script>

<template>
  <header class="sakura-page-header space-y-1" :class="{ 'sakura-fade-in-down': arrivalCover === undefined }" flex="~ center items-end justify-center">
    <SakuraImageCard v-bind="imageCard" :post="coverPost" :src="fm.cover" :resolved-src="arrivalCover" class="sakura-header-cover" h="full" w="full" absolute="!" z="-1" />
    <div class="sakura-header-grid">
      <div class="sakura-safe-padding sakura-header-container pb-25px">
        <div class="sakura-header-copy">
          <slot name="title">
            <div flex="~" class="sakura-header-title">
              <SakuraTitle :fm />
            </div>
          </slot>
          <slot />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.sakura-page-header {
  // If flattened, the children will not exist on their own in the 3D-space. – transform-style by MDN
  transform-style: preserve-3d;
  margin-top: var(--sakura-navbar-height);
  width: 100%;
  position: relative;
  height: 320px;

  &.sakura-post-header {
    --sakura-post-header-inset: clamp(20px, 4vw, 48px);
    --sakura-post-cover-left: max(20px, env(safe-area-inset-left));
    --sakura-post-cover-right: max(20px, env(safe-area-inset-right));
    --sakura-post-cover-radius: clamp(20px, 3.6vw, 40px);

    height: auto;
    min-height: clamp(210px, 23vw, 320px);
    margin-top: calc(var(--sakura-navbar-height) + 6px);
    isolation: isolate;
    transform-style: flat;

    .sakura-header-cover {
      inset: 0 var(--sakura-post-cover-right) 0 var(--sakura-post-cover-left);
      border-radius: var(--sakura-post-cover-radius);
      width: auto;
      z-index: 0;
      overflow: hidden;
      clip-path: inset(0 round var(--sakura-post-cover-radius));

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(to top, oklch(0% 0 0 / 72%), transparent 82%);
      }
    }

    &::before {
      content: none;
    }

    .sakura-header-container {
      z-index: 2;
      grid-column: var(--sakura-article-column, 1);
      min-width: 0;
      padding-block: var(--sakura-post-header-inset);
      text-align: start;
      overflow-wrap: anywhere;
    }

    .sakura-header-title :deep(.sakura-title) {
      text-shadow: 0 1px 5px oklch(0% 0 0 / 46%);
    }

    .sakura-header-copy {
      max-width: var(--sakura-article-width, 800px);
      margin-inline: auto;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(transparent 35%, oklch(0% 0 0 / 64%));
    pointer-events: none;
  }

  .sakura-header-container {
    position: relative;
    color: white;
  }
}
</style>
