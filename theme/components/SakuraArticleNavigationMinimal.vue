<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePostList } from 'valaxy'

const route = useRoute()
const posts = usePostList()

const nextPost = computed(() => posts.value[findCurrentIndex() - 1])
const prevPost = computed(() => posts.value[findCurrentIndex() + 1])

function findCurrentIndex() {
  return posts.value.findIndex(p => p.path === route.path)
}
</script>

<template>
  <div v-if="nextPost && nextPost.path" class="py-8">
    <h2 class="text-xs tracking-wide uppercase text-gray-500">
      Next Article
    </h2>
    <div class="link">
      <RouterLink :to="nextPost.path">
        {{ nextPost.title }}
      </RouterLink>
    </div>
  </div>
  <div v-if="prevPost && prevPost.path" class="py-8">
    <h2 class="text-xs tracking-wide uppercase text-gray-500">
      Previous Article
    </h2>
    <div class="link">
      <RouterLink :to="prevPost.path">
        {{ prevPost.title }}
      </RouterLink>
    </div>
  </div>
</template>
