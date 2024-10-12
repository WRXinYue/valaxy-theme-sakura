<script lang="ts" setup>
import type { Post } from 'valaxy'
import { useMounted } from '@vueuse/core'

defineProps<{
  post: Post
  imagePosition: boolean
}>()

const isMounted = useMounted()

// props.post.cover = props.post.cover || 'https://img.xjh.me/random_img.php?type=bg&return=302'
</script>

<template>
  <article v-if="isMounted" class="sakura-article-card" :class="imagePosition && post.cover && 'flex-row-reverse' || post.cover && 'md:text-right'">
    <SakuraImageCard
      v-if="post.cover" class="h-230px md:w-430px <md:rounded-3" :to="post.path" :src="post.cover"
      rotate="5" space="1.1" transition-duration="0.45s"
    />

    <div class="sakura-article-meta m-4">
      <div class="sakura-article-publish-info font-secondary" inline-flex items-center>
        <div i-mdi:clock-outline class="mr-1" /> 发布于
        <SakuraDate :date="post.date" />
      </div>
      <RouterLink :to="post.path || ''" :aria-label="`Read more about ${post.title}`">
        <div class="title">
          {{ post.title }}
        </div>
        <div class="mb-2.25 text-[var(--sakura-c-text-secondary)] dark:text-[var(--sakura-c-text-secondary)]" v-html="post.excerpt" />
      </RouterLink>

      <div class="inline-flex">
        <SakuraArticleCategories v-if="post.categories" class="font-secondary mr-3" :categories="post.categories" />
        <SakuraArticleTags v-if="post.tags" class="font-secondary" :tags="post.tags" />
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.sakura-article-card {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  color: var(--sakura-c-text-secondary);
  margin: 20px 0;
  border-radius: var(--sakura-c-article-card-rd);
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  min-height: 230px;

  &:hover {
    box-shadow: 0 5px 10px 5px rgb(0, 0, 0, 0.2);
  }

  .font-secondary {
    font-size: var(--sakura-c-article-card-font-size-secondary);
    color: var(--sakura-c-text-secondary);
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

  .title {
    color: var(--sakura-c-text);
    font-size: 24px;
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--sakura-c-accent);
    }
  }
}
</style>
