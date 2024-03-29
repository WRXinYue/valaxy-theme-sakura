<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePostList, useSiteConfig } from 'valaxy'
import type { Post } from 'valaxy'
import { useThemeConfig } from '../../composables'
import { useSakuraAppStore } from '../../stores/app'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), { })

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()
const pageSize = computed(() => themeConfig.value.pagination?.itemsPerPage || siteConfig.value.pageSize)

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
  <div v-if="!loading">
    <template v-for="(post, index) in postsWithLimitedTags" :key="post.path">
      <Transition name="fade">
        <SakuraArticleThemeMinima v-if="post" :id="`article-minima-${index}`" class="sakura-article-minima" :post="post" />
      </Transition>
    </template>
  </div>
</template>
