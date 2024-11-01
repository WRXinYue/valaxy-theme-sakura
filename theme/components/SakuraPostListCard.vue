<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from 'valaxy'
import { useThemeConfig } from '../composables'

defineProps<{
  posts: Post[]
}>()

const themeConfig = useThemeConfig()

const isImageReversed = computed(() => themeConfig.value.articleList?.settings?.card?.isImageReversed)
</script>

<template>
  <div v-if="posts?.length" class="sakura-post-list-card">
    <template v-for="(post, index) in posts" :key="post.path">
      <Transition name="fade">
        <SakuraPostCard v-if="post" :id="`sakura-post-${index}`" class="article-list" :image-position="index % 2 === (isImageReversed ? 1 : 0)" :post="post" />
      </Transition>
    </template>
  </div>
</template>
