<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
  imagePosition: boolean
}>()
</script>

<template>
  <article class="card" h-50 flex overflow-hidden justify-between :class="imagePosition && post.cover && 'flex-row-reverse'">
    <div v-if="post.cover" w="40%" h-auto overflow-hidden>
      <div bg="center no-repeat cover" transition-400 w-full h-full :class="`bg-[url(${post.cover})]`" hover:transform="scale-120" />
    </div>

    <div m-4>
      <div inline-flex items-center>
        <div i-fa-clock-o mr-1 /> 发布于 <SakuraDate :date="post.date" />
      </div>
      <RouterLink class="st-text" :to="post.path || ''">
        <div class="title" my-2>
          {{ post.title }}
        </div>
        <div v-html="post.excerpt" />
        <div class="tags">
          <a v-for="tag in post.tags" :key="tag" href="#" inline-flex items-center> <div i-fa-tag /> {{ tag }} </a>
        </div>
      <!-- <div class="tags">
        <a v-for="t in p.tags" :href="`${base}tags/?q=${t}`">
          <i class="fa fa-tag" />
          {{ t }}
        </a>
      </div> -->
      </RouterLink>
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
.view,
.tags {
  font-size: 14px;
}

.card {
  color: var(--color-gray);
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 10px 5px rgb(0, 0, 0, 0.2);
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

.tags a {
  margin-right: 8px;
  color: var(--color-gray);
  transition: color 0.2s ease-out;

  &:hover {
    color: var(--color-accent);
  }
}

@media (max-width: 720px) {
  .card {
    margin: 0;
    border-radius: 0;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }
}
</style>
