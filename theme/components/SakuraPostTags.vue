<script lang="ts" setup>
import type { Post } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  tags: Post['tags']
}>()

const tagsString = computed(() => {
  return props.tags?.join(' · ') || ''
})
</script>

<template>
  <div class="sakura-post-tags" :title="tagsString">
    <RouterLink v-for="(tag, index) in tags" :key="tag" :to="{ path: '/tags/', query: { tag } }" class="inline-flex items-center align-top">
      <span v-if="index === 0" class="sakura-icon mr-1 inline-block" i-mdi-tag-multiple />
      <span v-if="index > 0" class="non-hoverable mx-1">·</span> {{ tag }}
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.sakura-post-tags {
  font-size: 14px;

  a {
    color: var(--sakura-color-text);
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--sakura-color-action);

      .non-hoverable {
        color: var(--sakura-color-text) !important;
      }
    }
  }
}
</style>
