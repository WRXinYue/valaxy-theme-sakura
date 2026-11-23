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
    <SakuraImageCard v-bind="imageCard" :post="coverPost" :src="fm.cover" h="full" w="full" absolute="!" z="-1" />
    <div class="sakura-safe-padding sakura-header-container pb-25px">
      <slot name="title">
        <div flex="~" class="sakura-header-title">
          <SakuraTitle :fm />
        </div>
      </slot>
      <slot />
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
