<script setup lang="ts">
import { computed } from 'vue'
import { usePostList, useSiteConfig, useSiteStore } from 'valaxy'
import type { Post } from 'valaxy'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), {
  curPage: 1,
})

const site = useSiteStore()
const siteConfig = useSiteConfig()
const pageSize = computed(() => siteConfig.value.pageSize)

const routes = usePostList({ type: props.type || '' })
// const posts = computed(() => props.posts || routes.value)
const posts = computed(() => (
  props.posts || site.postList).filter(post => import.meta.env.DEV ? true : !post.hide),
)

const displayedPosts = computed(() =>
  posts.value.slice(
    (props.curPage - 1) * pageSize.value,
    props.curPage * pageSize.value,
  ),
)

const postsWithLimitedTags = computed(() => {
  return displayedPosts.value.map((post) => {
    if (post.tags && post.tags.length > 3)
      return { ...post, tags: post.tags.slice(0, 3) }

    return post
  })
})
</script>

<template>
  <div class="max-w-800px m-auto">
    <div class="pt-24px px-20px flex items-center">
      <div class="i-mdi:leaf mr-1 text-[#333]" /> 文章列表
    </div>
    <hr>

    <template v-for="(post, index) in postsWithLimitedTags" :key="post.path">
      <Transition name="fade">
        <SakuraArticleCard v-if="post" :image-position="index % 2 === 1" :post="post" />
      </Transition>
    </template>

    <ValaxyPagination :cur-page="curPage" :page-size="pageSize" :total="posts.length" />
  </div>
</template>
