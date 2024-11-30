<script lang="ts" setup>
import { computed } from 'vue'
import type { Post } from 'valaxy'
import { resolveImage } from 'valaxy-theme-sakura/utils/media.ts'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  post: Post
}>()

const themeConfig = useThemeConfig()

const cover = computed(() => props.post.cover || resolveImage(themeConfig.value.postList?.settings.card?.defaultImage || ''))
</script>

<template>
  <article class="sakurairo-post-card">
    <SakuraImageCard v-if="cover" :to="post.path" :src="cover" />

    <div class="sakurairo-post-card-content flex flex-col" :class="post.cover && 'has-cover'">
      <SakuraPostDate class="sakurairo-post-card-date" :date="post.date" />
      <RouterLink class="sakurairo-post-card-title order-2" :to="post.path || ''" :aria-label="`Read more about ${post.title}`">
        {{ post.title }}
      </RouterLink>
      <div class="sakurairo-post-card-excerpt order-3" v-html="post.excerpt" />
      <div class="sakurairo-post-card-meta order-4">
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

.sakurairo-post-card {
  position: relative;
  height: 300px;
  width: 100%;
  color: var(--sakura-text-muted-color);
  background: var(--sakura-post-card-bg-color);
  margin: 20px 0;
  border-radius: var(--sakura-post-card-rd);
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

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
    background-color: #ffffffbd;
    margin: 5px;
    padding: 10px 15px;
    bottom: 22%;
    left: 2%;
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(10px);
    position: absolute;
    display: inline-flex;
    box-shadow: 0 1px 30px -4px #e8e8e8;
    transition: all 0.6s ease-in-out;
    z-index: 3;
    height: fit-content;
    max-height: 34%;
    overflow: hidden;
    max-width: 80%;
    width: fit-content;

    &:hover {
      color: var(--sakura-accent-color);
    }
  }

  &-meta {
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    white-space: nowrap;
    font-weight: var(--global-font-weight);
    display: inline-flex;
    gap: 4px 12px;
    flex-direction: row;
    padding: 5px 10px;
    border-radius: 6px;
    max-width: 70%;
    top: 10px;
    right: 10px;
    backdrop-filter: saturate(180%) blur(10px);
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 3;
  }

  &-date,
  &-meta {
    font-size: 12px;

    & * {
      font-size: inherit;
    }

    a {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  &-date {
    width: max-content;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px 10px;
    border-radius: 6px;
    white-space: nowrap;
    font-weight: var(--global-font-weight);
    backdrop-filter: saturate(180%) blur(10px);
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 3;
    transition: all 0.6s ease-in-out;

    // margin-left: var(--sakura-post-card-date-ml);
  }

  &-meta > div {
    display: inline-block;
  }

  &-meta > div:not(:last-child) {
    margin-right: 12px;
  }

  &-excerpt {
    position: absolute;
    line-height: initial;
    color: var(--sakura-text-muted-color);
    bottom: 5%;
    width: 98%;
    max-height: 15%;
    height: fit-content;
    left: 2%;
    margin: 0;
    margin-top: 5px;
    margin-bottom: 9px;
    padding: 0 10px;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    overflow: hidden;
    font-size: 15px;
  }

  &-content {
    padding: var(--sakura-post-card-content-py)
      var(--sakura-post-card-content-px);

    &.has-cover {
      width: calc(100% - var(--sakura-post-card-img-width));
    }
  }

  .post-title {
    background-color: #ffffffbd;
    margin: 5px;
    padding: 10px 15px;
    bottom: 22%;
    left: 2%;
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(10px);
    position: absolute;
    display: inline-flex;
    box-shadow: 0 1px 30px -4px #e8e8e8;
    transition: all 0.6s ease-in-out;
    z-index: 3;
    height: fit-content;
    max-height: 34%;
    overflow: hidden;
    max-width: 80%;
    width: fit-content;
  }

  .sakura-image-card {
    position: absolute;
    z-index: 2;
    height: 68%;

    // height: var(--sakura-post-card-height);
    // width: var(--sakura-post-card-img-width);
    width: 100%;
    border-radius: 0.75rem;
    transition: all 0.6s ease-in-out;

    @include mobile {
      width: 100%;
    }

    &:hover {
      height: 100%;
    }
  }
}
</style>
