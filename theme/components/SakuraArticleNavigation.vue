<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePostList } from 'valaxy'
import { useThemeConfig } from '../composables'

const route = useRoute()
const posts = usePostList()
const themeConfig = useThemeConfig()

const nextPost = computed(() => posts.value[findCurrentIndex() - 1])
const prevPost = computed(() => posts.value[findCurrentIndex() + 1])

function findCurrentIndex() {
  return posts.value.findIndex(p => p.path === route.path)
}

const navigationMerge = computed(() => themeConfig.value.article?.navigationMerge || false)
</script>

<template>
  <div class="w-full" :class="navigationMerge && 'flex'">
    <SakuraImageCard
      v-if="nextPost && nextPost.path" :src="nextPost.cover" :to="prevPost.path" class="h-50"
      :class="navigationMerge ? 'w-1/2 rounded-l-$st-c-rd' : 'rounded-$st-c-rd mt-10'"
      :overlay="true" :overlay-opacity="0" :overlay-opacity-initial="0.5"
    >
      <div class="flex flex-col justify-center h-full w-full mx-10">
        <h2 class="text-xs tracking-wide uppercase text-$st-c-article-navigation-text">
          Next Article
        </h2>
        <div class="link">
          <RouterLink :to="nextPost.path">
            {{ nextPost.title }}
          </RouterLink>
        </div>
      </div>
    </SakuraImageCard>
    <SakuraImageCard
      v-if="prevPost && prevPost.path" :src="prevPost.cover" :to="prevPost.path" class="h-50"
      :class="navigationMerge ? 'w-1/2 rounded-r-$st-c-rd' : 'rounded-$st-c-rd mt-10'"
      :overlay="true" :overlay-opacity="0" :overlay-opacity-initial="0.5"
    >
      <div class="flex flex-col justify-center h-full mx-10 justify-end">
        <h2 class="text-xs tracking-wide uppercase text-$st-c-article-navigation-text flex justify-end">
          Previous Article
        </h2>
        <div class="link flex justify-end">
          <RouterLink :to="prevPost.path">
            {{ prevPost.title }}
          </RouterLink>
        </div>
      </div>
    </SakuraImageCard>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: var(--st-c-article-navigation-text);
  font-weight: bold;
}
</style>
