<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from 'valaxy'
import { usePostList, useThemeConfig } from '../composables'

const props = defineProps<{
  icon?: string
  text?: string
  posts?: Post[]
}>()

const themeConfig = useThemeConfig()
const postsList = usePostList()

const icon = computed(() => props.icon ?? themeConfig.value.articleList?.icon)
const text = computed(() => props.text ?? themeConfig.value.articleList?.text)
const posts = computed(() => props.posts || postsList.value)
</script>

<template>
  <div class="sakura-post-list">
    <SakuraDivider :icon :text />
    <SakuraPostListCard :posts />
    <!-- TODO: -->
    <!-- <SakuraPostListGrid :posts />
    <SakuraPostListMasonry :posts /> -->
  </div>
</template>
