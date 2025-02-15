<script lang="ts" setup>
import type { PostFrontMatter } from 'valaxy'
import { computed } from 'vue'
import type { SakuraImageCardProps } from '../types'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  fm: PostFrontMatter
  imageCard?: SakuraImageCardProps
}>()

const themeConfig = useThemeConfig()

const imageCard = computed(() => props.imageCard || themeConfig.value.ui.pageHeader?.image)
</script>

<template>
  <header class="sakura-page-header space-y-1" :class="fm.cover && `has-cover`" flex="~ center items-end justify-center">
    <SakuraImageCard v-if="fm.cover" v-bind="imageCard" :src="fm.cover" h="full" w="full" absolute="!" z="-1" />
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
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-page-header {
  margin-top: var(--sakura-navbar-height);
  width: 100%;
  position: relative;

  &:not(.has-cover) {
    margin-top: var(--sakura-navbar-spacing);

    .sakura-header-title {
      justify-content: center;
    }
  }

  .sakura-header-container {
    color: white;
  }

  &.has-cover {
    height: 320px;
  }
}
</style>
