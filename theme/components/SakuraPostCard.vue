<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
  imagePosition: boolean
}>()
</script>

<template>
  <article class="sakura-post-card" :class="imagePosition && post.cover && 'flex-row-reverse' || post.cover && 'md:text-right'">
    <SakuraImageCard v-if="post.cover" :to="post.path" :src="post.cover" rotate="5" space="1.1" transition-duration="0.45s" />

    <div class="sakura-post-card-content flex flex-col" :class="post.cover && 'has-cover'">
      <SakuraPostDate :date="post.date" class="order-1" />
      <RouterLink class="sakura-post-card-title order-2" :to="post.path || ''" :aria-label="`Read more about ${post.title}`">
        {{ post.title }}
      </RouterLink>
      <div class="sakura-post-card-excerpt order-3" v-html="post.excerpt" />
      <div class="sakura-post-card-meta order-4">
        <slot name="meta">
          <SakuraPostCategories v-if="post.categories" :categories="post.categories" />
          <SakuraPostTags v-if="post.tags" :tags="post.tags" />
          <slot name="meta-extend" />
        </slot>
      </div>
      <slot name="content-extend" />
    </div>
  </article>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-post-card {
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  color: var(--sakura-text-muted-color);
  background: var(--sakura-post-card-bg-color);
  margin: 20px 0;
  border-radius: var(--sakura-post-card-rd);
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  min-height: var(--sakura-post-card-height);

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
    font-size: 1.17em;
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--sakura-accent-color);
    }
  }

  .sakura-post-date,
  &-meta {
    font-size: 12px;

    & * {
      font-size: inherit;
    }
  }

  &-meta > div {
    display: inline-block;
  }

  &-meta > div:not(:last-child) {
    margin-right: 12px;
  }

  &-excerpt {
    margin-bottom: 9px;
    line-height: initial;
    color: var(--sakura-text-muted-color);
  }

  &-content {
    padding: var(--sakura-post-card-content-py)
      var(--sakura-post-card-content-px);

    &.has-cover {
      width: calc(100% - var(--sakura-post-card-img-width));
    }
  }

  .sakura-post-date {
    position: relative;
    margin-left: var(--sakura-post-card-date-ml);

    .sakura-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%)
        translateX(calc(-1 * var(--sakura-post-card-date-ml)));
    }
  }

  .sakura-image-card {
    height: var(--sakura-post-card-height);
    width: var(--sakura-post-card-img-width);
    border-radius: 0.75rem;

    @include mobile {
      width: 100%;
    }
  }
}
</style>
