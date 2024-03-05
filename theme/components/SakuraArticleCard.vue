<script lang="ts" setup>
import type { Post } from 'valaxy'
import { onMounted, ref } from 'vue'

defineProps<{
  post: Post
  imagePosition: boolean
}>()

const loading = ref(true)

onMounted(() => {
  loading.value = false
})
</script>

<template>
  <article v-if="!loading" :class="imagePosition && post.cover && 'flex-row-reverse' || post.cover && 'md:text-right'">
    <SakuraImageCard
      v-if="post.cover" class="<md:rounded-3 h-230px md:w-430px" :to="post.path" :src="post.cover"
      rotate="5" space="1.1" transition-duration="0.45s"
    />

    <div class="m-4">
      <div class="font-secondary" inline-flex items-center>
        <div i-mdi:clock-outline class="mr-1" /> 发布于
        <SakuraDate :date="post.date" />
      </div>
      <RouterLink :to="post.path || ''" :aria-label="`Read more about ${post.title}`">
        <div class="title my-2">
          {{ post.title }}
        </div>
        <div class="mb-3 text-[var(--st-c-text-secondary)] dark:text-[var(--st-c-text-secondary)]" v-html="post.excerpt" />
      </RouterLink>

      <div class="inline-flex">
        <SakuraPostCategories v-if="post.categories" class="font-secondary mr-3" :categories="post.categories" />
        <SakuraPostTags v-if="post.tags" class="font-secondary" :tags="post.tags" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
article {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  color: var(--st-c-text-secondary);
  margin: 20px 0;
  border-radius: var(--st-c-article-card-rd);
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 10px 5px rgb(0, 0, 0, 0.2);
  }

  .font-secondary {
    font-size: var(--st-c-article-card-font-size-secondary);
    color: var(--st-c-text-secondary);
  }

  @media (max-width: 768px) {
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

  &:hover {
    color: var(--st-c-accent);
  }
}
</style>
