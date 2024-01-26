<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
  imagePosition: boolean
}>()
</script>

<template>
  <article :class="imagePosition && post.cover && 'flex-row-reverse' || post.cover && 'md:text-right'">
    <div v-if="post.cover" class="h-auto overflow-hidden h-full <md:rounded-3">
      <RouterLink :to="post.path || ''">
        <img class="object-cover h-210px w-full transition-400" :src="post.cover" alt="cover" hover:transform="scale-120">
      </RouterLink>
    </div>

    <div class="m-4 w-100">
      <div class="inline-flex items-center">
        <div i-fa-clock-o class="mr-1" /> 发布于 <SakuraDate :date="post.date" />
      </div>
      <RouterLink :to="post.path || ''">
        <div class="title my-2">
          {{ post.title }}
        </div>
        <div v-html="post.excerpt" />
      </RouterLink>

      <SakuraPostTags v-if="post.tags" :tags="post.tags" />
    <!-- <div
      v-if="post.excerpt"
      class="prose max-w-none text-gray-500"
      v-html="post.excerpt"
    />
    <div class="space-y-5 xl:col-span-3">
      <div class="text-base leading-6 font-medium">
        <RouterLink class="link" aria-label="read more" :to="post.path || ''">
          Read more →
        </RouterLink>
      </div>
    </div> -->
    </div>
  </article>
</template>

<style lang="scss" scoped>
article {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  color: var(--color-gray);
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 10px 5px rgb(0, 0, 0, 0.2);
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
  color: #333;
  font-size: 24px;
  transition: color 0.2s ease-out;

  &:hover {
    color: var(--color-accent);
  }
}
</style>
