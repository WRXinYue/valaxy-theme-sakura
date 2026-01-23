<script lang="ts" setup>
import { usePostList } from 'valaxy'
import { computed } from 'vue'

const postList = usePostList()
const posts = computed(() => {
  return [...postList.value]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 5)
})
</script>

<template>
  <SakuraSidebarCard class="sakura-sidebar-posts" icon="i-ri-file-list-line" title="Latest Posts">
    <div class="px-2">
      <div v-for="post in posts" :key="post.path" class="sidebar-post-item" py-2>
        <RouterLink :to="post.path || ''" class="sidebar-post-link block truncate">
          {{ post.title }}
        </RouterLink>
        <div class="sidebar-post-date mt-1 text-xs opacity-60">
          {{ new Date(post.date as string).toLocaleDateString() }}
        </div>
      </div>
    </div>
  </SakuraSidebarCard>
</template>

<style lang="scss" scoped>
.sidebar-post-item {
  border-bottom: 1px dashed var(--sakura-color-divider);

  &:last-child {
    border-bottom: none;
  }
}

.sidebar-post-link {
  color: var(--sakura-color-text);
  transition: color 0.3s;
  font-size: 0.85rem;

  &:hover {
    color: var(--sakura-color-primary);
  }
}
</style>
