<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  tags: Post['tags']
}>()
</script>

<template>
  <div class="tags">
    <RouterLink v-for="tag in tags" :key="tag" :to="{ path: '/tags/', query: { tag } }" class="inline-flex items-center">
      <div i-fa-tag /> {{ tag }}
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  font-size: 14px;

  a {
    margin-right: 8px;
    color: var(--color-gray);
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--color-accent);
    }
  }
}
</style>
