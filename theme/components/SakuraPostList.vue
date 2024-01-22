<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from 'valaxy'
import { usePostList } from 'valaxy'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), {
  curPage: 1,
})

const routes = usePostList({ type: props.type || '' })
const posts = computed(() => props.posts || routes.value)
</script>

<template>
  <div class="max-w-800px m-auto">
    <div class="pt-24px px-20px flex items-center">
      <div class="i-fa-book mr-1 text-[#333]" /> 文章列表
    </div>
    <hr>

    <template v-for="(post, index) in posts" :key="post.path">
      <Transition name="fade">
        <SakuraArticleCard v-if="post" :image-position="index % 2 === 1" :post="post" />
      </Transition>
    </template>
  </div>
</template>
