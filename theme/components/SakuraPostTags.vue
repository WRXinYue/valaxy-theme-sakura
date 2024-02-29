<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  tags: Post['tags']
}>()
</script>

<template>
  <div class="tags">
    <RouterLink v-for="(tag, index) in tags" :key="tag" :to="{ path: '/tags/', query: { tag } }" class="inline-flex items-center align-top">
      <div v-if="index === 0" class="mr-1" i-mdi-tag-multiple />
      <span v-if="index > 0" class="mx-1 non-hoverable">·</span> {{ tag }}
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  font-size: 14px;

  a {
    color: var(--st-c-gray);
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--st-c-accent);

      .non-hoverable {
        color: var(--st-c-gray) !important;
      }
    }
  }
}
</style>
