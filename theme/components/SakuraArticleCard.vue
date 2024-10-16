<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
  imagePosition: boolean
}>()
</script>

<template>
  <article class="sakura-article-card" :class="imagePosition && post.cover && 'flex-row-reverse' || post.cover && 'md:text-right'">
    <SakuraImageCard v-if="post.cover" :to="post.path" :src="post.cover" rotate="5" space="1.1" transition-duration="0.45s" />

    <div class="sakura-article-card-content">
      <div class="sakura-article-card-date inline-flex items-center">
        <span i-mdi:clock-outline class="mr-1 inline-block" /> 发布于
        <SakuraDate :date="post.date" />
      </div>
      <RouterLink :to="post.path || ''" :aria-label="`Read more about ${post.title}`">
        <div class="sakura-article-card-title">
          {{ post.title }}
        </div>
        <div class="sakura-article-card-excerpt" v-html="post.excerpt" />
      </RouterLink>

      <div class="sakura-article-card-meta inline-flex">
        <SakuraArticleCategories v-if="post.categories" :categories="post.categories" />
        <SakuraArticleTags v-if="post.tags" :tags="post.tags" />
      </div>
    </div>
  </article>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-article-card {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  color: var(--sakura-text-muted-color);
  background: var(--sakura-article-card-bg-color);
  margin: 20px 0;
  border-radius: var(--sakura-article-card-rd);
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  min-height: var(--sakura-article-card-height);

  &:hover {
    box-shadow: 0 5px 10px 5px rgb(0, 0, 0, 0.2);
  }

  @include mobile {
    margin: 0 20px;
    border-radius: 0;
    box-shadow: none;
    flex-direction: column;

    &:hover {
      box-shadow: none;
    }
  }

  &-title {
    color: var(--sakura-text-deep-color);
    font-size: 24px;
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--sakura-accent-color);
    }
  }

  &-date,
  &-meta {
    font-size: 12px;

    & * {
      font-size: inherit;
    }
  }

  &-meta > div:not(:last-child) {
    margin-right: 12px;
  }

  &-excerpt {
    margin-bottom: 9px;
    color: var(--sakura-text-muted-color);
  }

  &-content {
    padding: 16px;
    width: calc(100% - var(--sakura-article-card-img-width));
  }

  .sakura-image-card {
    height: var(--sakura-article-card-height);
    width: var(--sakura-article-card-img-width);
    border-radius: 0.75rem;

    @include mobile {
      width: 100%;
    }
  }
}
</style>
