<script setup lang="ts">
import type { PostFrontMatter } from 'valaxy'

defineProps<{
  fm: PostFrontMatter
}>()
</script>

<template>
  <div class="sakura-title" flex="~ items-center">
    <slot name="icon">
      <div v-if="fm.icon" class="icon" m="r-1" inline-flex align-top :class="fm.icon" />
    </slot>
    <span>{{ fm.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: inherit;
  text-shadow: 2px 2px 10px black;

  @include screen('sm') {
    font-size: 2.3rem;
  }
}
</style>
