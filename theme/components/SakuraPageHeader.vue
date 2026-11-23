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

const imageCard = computed(() => props.imageCard || themeConfig.value.ui.pageHeader?.image)
</script>

<template>
  <header class="sakura-page-header sakura-fade-in-down space-y-1" flex="~ center items-end justify-center">
    <SakuraImageCard v-bind="imageCard" :post="coverPost" :src="fm.cover" class="sakura-header-cover" h="full" w="full" absolute="!" z="-1" />
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

    .sakura-header-cover,
    &::before {
      inset: 0 var(--sakura-post-cover-right) 0 var(--sakura-post-cover-left);
      border-radius: var(--sakura-post-cover-radius);
    }

    .sakura-header-cover {
      width: auto;
      z-index: 0;
      clip-path: inset(0 round var(--sakura-post-cover-radius));
    }

    &::before {
      z-index: 1;
      background: linear-gradient(to top, oklch(0% 0 0 / 72%), transparent 82%);
    }

    .sakura-header-container {
      z-index: 2;
      grid-column: var(--sakura-article-column, 1);
      min-width: 0;
      padding-block: var(--sakura-post-header-inset);
      text-align: start;
      overflow-wrap: anywhere;
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
