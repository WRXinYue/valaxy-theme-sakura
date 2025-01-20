<script setup lang="ts">
import { usePrevNext } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'
import type { SakuraImageCardProps } from './SakuraImageCard.vue'

const props = withDefaults(defineProps<{
  [key: string]: any
} & Partial<SakuraImageCardProps>>(), {
  overlay: true,
  overlayOpacity: 0,
  overlayOpacityInitial: 0.5,
})

const themeConfig = useThemeConfig()
const [prev, next] = usePrevNext()

const navigationMerge = computed(() => themeConfig.value.postFooter?.navigationMerge || false)
</script>

<template>
  <div class="sakura-post-nav" :class="navigationMerge && 'flex'">
    <SakuraImageCard
      v-if="prev?.path" v-bind="{ ...props, src: prev.cover, to: prev.path }"
      class="card-prev" :class="{
        'mt-10': !navigationMerge,
        'w-1/2 rounded-l-$sakura-radius': next?.path && navigationMerge,
        'rounded-$sakura-radius': (navigationMerge && !next?.path) || !navigationMerge,
      }"
    >
      <div class="sakura-post-nav-content">
        <span class="sakura-post-nav-label">
          Previous Post
        </span>
        <RouterLink :to="prev.path" class="sakura-post-nav-title">
          {{ prev.title }}
        </RouterLink>
      </div>
    </SakuraImageCard>
    <SakuraImageCard
      v-if="next?.path" v-bind="{ ...props, src: next.cover, to: next.path }"
      class="card-next" :class="{
        'w-1/2 rounded-r-$sakura-radius': prev?.path && navigationMerge,
        'rounded-$sakura-radius': (navigationMerge && !prev?.path) || !navigationMerge,
      }"
    >
      <div class="sakura-post-nav-content">
        <span flex justify-end class="sakura-post-nav-label">
          Next Post
        </span>
        <RouterLink :to="next.path" class="sakura-post-nav-title" flex justify-end>
          {{ next.title }}
        </RouterLink>
      </div>
    </SakuraImageCard>
  </div>
</template>

<style lang="scss" scoped>
.sakura-post-nav {
  width: 100%;

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
  }

  &-content > * {
    z-index: 2;
  }

  &-label {
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: oklch(100% 0 0 / 70%);
  }

  &-title {
    color: oklch(97.51% 0.01 244.25);
    font-weight: bold;
  }

  .sakura-image-card {
    height: var(--sakura-post-nav-height);
    width: 100%;
    border-radius: 0;

    &::before {
      content: '';
      transition: opacity 0.3s ease-in-out;
      background-color: var(--sakura-color-overlay-background);
      opacity: 0.6;
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    &:hover::before {
      opacity: 0.4;
    }
  }
}
</style>
