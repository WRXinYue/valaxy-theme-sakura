<script setup lang="ts">
import { computed } from 'vue'
import { usePostList, useSiteConfig } from 'valaxy'
import type { Post } from 'valaxy'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), { })

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()
const pageSize = computed(() => themeConfig.value.pagination?.itemsPerPage || siteConfig.value.pageSize)
const isImageReversed = computed(() => themeConfig.value.articleList?.settings?.card?.isImageReversed)

const routes = usePostList({ type: props.type || '' })
const posts = computed(() => props.posts || routes.value)
const curPage = computed(() => props.curPage || sakura.curPage || 1)

const displayedPosts = computed(() =>
  posts.value.slice(
    (curPage.value - 1) * pageSize.value,
    curPage.value * pageSize.value * sakura.loadMultiple,
  ),
)

const postsWithLimitedTags = computed(() => {
  return displayedPosts.value.map((post) => {
    post.cover = post.cover || themeConfig.value.articleList?.settings?.card?.defaultImage
    if (post.tags && post.tags.length > 3)
      return { ...post, tags: post.tags.slice(0, 3) }

    return post
  })
})
</script>

<template>
  <div v-if="postsWithLimitedTags?.length" class="sakura-article-list-card">
    <template v-for="(post, index) in postsWithLimitedTags" :key="post.path">
      <Transition name="fade">
        <SakuraArticleCard v-if="post" :id="`sakura-article-${index}`" class="article-list" :image-position="index % 2 === (isImageReversed ? 1 : 0)" :post="post" />
      </Transition>
    </template>
  </div>
</template>
