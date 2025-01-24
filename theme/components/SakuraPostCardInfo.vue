<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="sakura-post-card-info">
    <SakuraPostDate :date="post.date" class="post-date order-1" pb-4 text-sm />
    <SakuraPostTitle pb-4 class="order-2" :title="post.title" :to="post.path" />
    <SakuraPostMeta pb-2 class="order-3" :post />
    <SakuraPostExcerpt v-if="post?.excerpt" pb-2 class="order-4" :excerpt="post.excerpt" />
  </div>
</template>

<style lang="scss">
.sakura-post-card-info {
  .post-date {
    font-size: 12px;
    color: var(--sakura-color-text);
  }
}
</style>
