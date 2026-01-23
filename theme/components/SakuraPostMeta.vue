<script setup lang="ts">
import type { Post } from 'valaxy'

withDefaults(defineProps<{
  post: Post
  truncate?: boolean
}>(), {
  truncate: false,
})
</script>

<template>
  <div class="sakura-post-meta" :class="{ 'is-truncated': truncate }">
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

  &.is-truncated {
    display: flex;
    align-items: center;
    width: 100%;

    & > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      flex-shrink: 1;
      max-width: 50%;
      display: block;

      :deep(a) {
        display: inline;
        vertical-align: middle;
      }

      :deep(.sakura-icon) {
        display: inline-block;
        vertical-align: middle;
        margin-top: -2px;
      }
    }
  }
}
</style>
