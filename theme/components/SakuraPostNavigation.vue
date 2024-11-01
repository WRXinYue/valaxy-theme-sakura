<script setup lang="ts">
import { computed } from 'vue'
import { usePrevNext } from 'valaxy'
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

const navigationMerge = computed(() => themeConfig.value.article?.navigationMerge || false)
</script>

<template>
  <div class="sakura-post-navigation" :class="navigationMerge && 'flex'">
    <SakuraImageCard
      v-if="prev?.path" v-bind="{ ...props, src: prev.cover, to: prev.path }"
      class="card-prev" :class="{
        'mt-10': !navigationMerge,
        'w-1/2 rounded-l-$sakura-border-radius': next?.path && navigationMerge,
        'rounded-$sakura-border-radius': (navigationMerge && !next?.path) || !navigationMerge,
      }"
    >
      <div class="sakura-post-navigation-content">
        <span class="sakura-post-navigation-label">
          Previous Post
        </span>
        <RouterLink :to="prev.path" class="sakura-post-navigation-title">
          {{ prev.title }}
        </RouterLink>
      </div>
    </SakuraImageCard>
    <SakuraImageCard
      v-if="next?.path" v-bind="{ ...props, src: next.cover, to: next.path }"
      class="card-next" :class="{
        'w-1/2 rounded-r-$sakura-border-radius': prev?.path && navigationMerge,
        'rounded-$sakura-border-radius': (navigationMerge && !prev?.path) || !navigationMerge,
      }"
    >
      <div class="sakura-post-navigation-content">
        <span flex justify-end class="sakura-post-navigation-label">
          Next Post
        </span>
        <RouterLink :to="next.path" class="sakura-post-navigation-title" flex justify-end>
          {{ next.title }}
        </RouterLink>
      </div>
    </SakuraImageCard>
  </div>
</template>

<style lang="scss">
.sakura-post-navigation {
  width: 100%;

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
  }

  &-label {
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: var(--sakura-post-navigation-label-color);
  }

  &-title {
    color: var(--sakura-post-navigation-title-color);
    font-weight: bold;
  }

  .sakura-image-card {
    height: var(--sakura-post-navigation-height);
    width: 100%;
  }
}
</style>
