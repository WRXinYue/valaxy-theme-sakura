<script lang="ts" setup>
import type { PostFrontMatter } from 'valaxy'

defineProps<{
  fm: PostFrontMatter
}>()
</script>

<template>
  <header class="sakura-page-header space-y-1 xl:pb-10" :class="fm.cover && `has-cover`">
    <SakuraImageCard v-if="fm.cover" :src="fm.cover" />
    <div class="sakura-header-container">
      <slot name="title">
        <div class="sakura-header-title">
          <div v-if="fm.icon" class="icon" m="r-1" inline-flex align-top :class="fm.icon" />
          {{ fm.title }}
          <span v-if="fm.subTitle">· {{ fm.subTitle }}</span>
        </div>
      </slot>
      <slot />
    </div>
  </header>
</template>

<style lang="scss">
.sakura-page-header {
  margin-top: var(--sakura-navbar-height);
  display: flex;
  align-items: flex-end;
  width: 100%;
  position: relative;

  &:not(.has-cover) {
    margin-top: var(--sakura-navbar-spacing);
    height: 200px;

    .sakura-header-title {
      color: var(--sakura-text-deep-color);
    }
  }

  &.has-cover {
    height: 320px;

    .sakura-header-title {
      text-shadow: 2px 2px 10px black;
    }
  }

  .sakura-header-container {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -30%);
    color: white;
    font-weight: 700;
  }

  .sakura-header-title {
    font-size: 2.3rem;
  }
}
</style>
