<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSiteConfig, useSiteStore } from 'valaxy'
import type { Post } from 'valaxy'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores/app'

// import { usePostList } from 'valaxy'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), {
  curPage: 1,
})

const site = useSiteStore()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()
const pageSize = computed(() => themeConfig.value.pagination?.itemsPerPage || siteConfig.value.pageSize)

// const routes = usePostList({ type: props.type || '' })
// const posts = computed(() => props.posts || routes.value)
const paginationType = computed(() => themeConfig.value.pagination?.type || 'infinite-scroll')
const posts = computed(() => (
  props.posts || site.postList).filter(post => import.meta.env.DEV ? true : !post.hide),
)

const displayedPosts = computed(() =>
  posts.value.slice(
    (props.curPage - 1) * pageSize.value,
    props.curPage * pageSize.value * sakura.loadMultiple,
  ),
)

const postsWithLimitedTags = computed(() => {
  return displayedPosts.value.map((post) => {
    if (post.tags && post.tags.length > 3)
      return { ...post, tags: post.tags.slice(0, 3) }

    return post
  })
})

const loading = ref(true)
onMounted(() => {
  loading.value = false
})
</script>

<template>
  <div v-if="!loading" class="md:w-800px m-auto min-w-300px">
    <div class="pt-24px px-20px flex items-center">
      <div class="i-mdi:leaf mr-1 text-[#333]" /> 文章列表
    </div>
    <hr>

    <template v-for="(post, index) in postsWithLimitedTags" :key="post.path">
      <Transition name="fade">
        <SakuraArticleCard v-if="post" :id="`article-card-${index}`" class="article-card" :image-position="index % 2 === 1" :post="post" />
      </Transition>
    </template>

    <template v-if="paginationType === 'infinite-scroll'">
      <SakuraPagination :page-size="pageSize" :total="posts.length" />
    </template>

    <template v-if="paginationType === 'pagination'">
      <ValaxyPagination :cur-page="curPage" :page-size="pageSize" :total="posts.length" />
    </template>
  </div>
</template>
