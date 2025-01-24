<script lang="ts" setup>
import type { PostFrontMatter } from 'valaxy'

defineProps<{
  fm: PostFrontMatter
}>()
</script>

<template>
  <header class="sakura-page-header space-y-1" :class="fm.cover && `has-cover`" flex="~ center items-end justify-center">
    <SakuraImageCard v-if="fm.cover" :src="fm.cover" h="full" w="full" absolute="!" z="-1" />
    <div class="sakura-safe-padding sakura-header-container pb-25px">
      <slot name="title">
        <div class="sakura-header-title" flex="~ items-center" :class="!fm.cover && 'sakura-braced-text flex-center mx-6%'">
          <slot name="icon">
            <div v-if="fm.icon" class="icon" m="r-1" inline-flex align-top :class="fm.icon" />
          </slot>
          <span>{{ fm.title }}</span>
          <span v-if="fm.subTitle"> · {{ fm.subTitle }}</span>
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

  .sakura-header-title {
    font-size: 1.8rem;
    font-weight: 700;

    @include screen('sm') {
      font-size: 2.3rem;
    }
  }

  &:not(.has-cover) {
    margin-top: var(--sakura-navbar-spacing);

    .sakura-header-title {
      color: var(--sakura-color-text-deep);
    }
  }

  &.has-cover {
    height: 320px;

    .sakura-header-title {
      text-shadow: 2px 2px 10px black;
    }
  }

  .sakura-header-container {
    color: white;
  }
}
</style>
