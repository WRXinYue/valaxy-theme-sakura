<script lang="ts" setup>
import type { Post } from 'valaxy'
import { useMounted } from '@vueuse/core'

defineProps<{
  post: Post
}>()

const isMounted = useMounted()
</script>

<template>
  <article v-if="isMounted">
    <RouterLink :to="post.path || ''" :aria-label="`Read more about ${post.title}`">
      <SakuraDate :date="post.date" class="sakura-minima-date" />
      <div class="title my-2">
        {{ post.title }}
      </div>
    </RouterLink>
    <div class="mb-3 text-[var(--st-c-text-secondary)] dark:text-[var(--st-c-text-secondary)]" v-html="post.excerpt" />
  </article>
</template>

<style lang="scss" scoped>
article {
  color: var(--st-c-text-secondary);
  margin: 20px 0;
  transition: box-shadow 0.3s ease;

  .font-secondary {
    font-size: var(--st-c-article-card-font-size-secondary);
    color: var(--st-c-text-secondary);
  }

  @media (width <= 768px) {
    margin: 0 20px;
    border-radius: 0;
    box-shadow: none;
    flex-direction: column;

    &:hover {
      box-shadow: none;
    }
  }
}

.title {
  color: var(--st-c-text);
  font-size: 24px;
  transition: color 0.2s ease-out;

  // &:hover {
  //   color: var(--st-c-accent);
  // }
}

.sakura-minima-date {
  color: var(--st-c-text);
  font-size: 36px;
  transition: color 0.2s ease-out;
}
</style>
