<script setup lang="ts">
import type { Post } from 'valaxy'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="sakura-post-meta">
    <slot name="meta">
      <SakuraPostCategories v-if="post.categories" :categories="post.categories" />
      <SakuraPostTags v-if="post.tags" :tags="post.tags" />
      <slot name="meta-extend" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.sakura-post-meta {
  font-size: 12px;

  & * {
    font-size: inherit;
  }

  & > div {
    display: inline-block;
  }

  & > div:not(:last-child) {
    margin-right: 12px;
  }
}
</style>
