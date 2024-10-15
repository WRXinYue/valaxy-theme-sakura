<script setup lang="ts">
import { computed } from 'vue'
import { usePrevNext } from 'valaxy'
import { useThemeConfig } from '../../composables'
import type { SakuraImageCardProps } from '../SakuraImageCard.vue'

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
  <div class="sakura-article-navigation" :class="navigationMerge && 'flex'">
    <SakuraImageCard
      v-if="prev?.path" v-bind="{ ...props, src: prev.cover, to: prev.path }"
      class="card-prev" :class="{
        'mt-10': !navigationMerge,
        'w-1/2 rounded-l-$sakura-rd': next?.path && navigationMerge,
        'rounded-$sakura-rd': (navigationMerge && !next?.path) || !navigationMerge,
      }"
    >
      <div class="article-navigation-content">
        <h2>
          Previous Article
        </h2>
        <div class="link">
          <RouterLink :to="prev.path">
            {{ prev.title }}
          </RouterLink>
        </div>
      </div>
    </SakuraImageCard>
    <SakuraImageCard
      v-if="next?.path" v-bind="{ ...props, src: next.cover, to: next.path }"
      class="card-next" :class="{
        'w-1/2 rounded-r-$sakura-rd': prev?.path && navigationMerge,
        'rounded-$sakura-rd': (navigationMerge && !prev?.path) || !navigationMerge,
      }"
    >
      <div class="article-navigation-content">
        <h2 flex justify-end>
          Next Article
        </h2>
        <div class="link" flex justify-end>
          <RouterLink :to="next.path">
            {{ next.title }}
          </RouterLink>
        </div>
      </div>
    </SakuraImageCard>
  </div>
</template>

<style lang="scss">
.sakura-article-navigation {
  width: 100%;

  .article-navigation-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 2.5rem;
    margin-right: 2.5rem;

    h2 {
      font-size: 0.75rem;
      line-height: 1rem;
      letter-spacing: 0.025em;
      text-transform: uppercase;
      color: var(--sakura-article-navigation-text-color);
    }
  }

  .sakura-image-card {
    height: 12.5rem;
    width: 100%;
  }

  a {
    color: var(--sakura-article-navigation-text-color);
    font-weight: bold;
  }
}
</style>
