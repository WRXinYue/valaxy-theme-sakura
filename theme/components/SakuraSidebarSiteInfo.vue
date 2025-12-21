<script lang="ts" setup>
import { useCategories, useSiteStore, useTags } from 'valaxy'
import { computed } from 'vue'

const site = useSiteStore()
const categories = useCategories()
const tags = useTags()

const postCount = computed(() => site.postList.length)
const categoryCount = computed(() => Array.from(categories.value.children).length)
const tagCount = computed(() => Array.from(tags.value).length)
</script>

<template>
  <SakuraSidebarCard class="sakura-sidebar-site-info" mt-4>
    <SakuraSiteInfo />

    <div class="content-container grid grid-cols-3 gap-x-8">
      <RouterLink to="/archives" class="article">
        <span class="content-text">文章</span><br>
        <span class="content-number">{{ postCount }}</span>
      </RouterLink>
      <RouterLink to="/tags" class="label">
        <span class="content-text">标签</span><br>
        <span class="content-number">{{ tagCount }}</span>
      </RouterLink>
      <RouterLink to="/categories" class="category">
        <span class="content-text">分类</span><br>
        <span class="content-number">{{ categoryCount }}</span>
      </RouterLink>
    </div>
  </SakuraSidebarCard>
</template>

<style lang="scss" scoped>
.content-container {
  text-align: center;
  margin-top: 14px;
}

.content-text {
  font-size: 0.85rem;
  line-height: 1.5rem;
}

.content-number {
  font-size: 1.1rem;
  line-height: 1.5rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

:deep(.site-description) {
  font-size: 0.85rem;
}

:deep(.site-author-name) {
  font-size: 1rem;
}
</style>
