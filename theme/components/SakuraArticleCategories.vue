<script lang="ts" setup>
import { computed } from 'vue'
import type { Post } from 'valaxy'

const props = defineProps<{
  categories: Post['categories']
}>()

const convertedCategories = computed(() => {
  if (typeof props.categories === 'string')
    return [props.categories]

  return props.categories
})
</script>

<template>
  <div class="categories">
    <RouterLink
      v-for="(category, index) in convertedCategories"
      :key="index"
      :to="{ path: '/categories', query: { category: Array.isArray(categories) ? categories.join('/') : categories } }"
      class="inline-flex items-center align-top"
    >
      <div v-if="index === 0" class="mr-1" i-mdi-folder-open-outline />
      <span v-if="index > 0" class="mx-1">/</span> {{ category }}
    </RouterLink>
  </div>
</template>

<style last="scss" scoped>
.categories {
  font-size: 14px;

  a {
    color: var(--sakura-c-text-secondary);
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--sakura-c-accent);
    }
  }
}
</style>
