<script lang="ts" setup>
import type { Post } from 'valaxy'
import { computed } from 'vue'

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
  <div class="sakura-post-categories">
    <RouterLink
      v-for="(category, index) in convertedCategories"
      :key="index"
      :to="{ path: '/categories', query: { category: Array.isArray(categories) ? categories.join('/') : categories } }"
      class="inline-flex items-center align-top"
    >
      <span v-if="index === 0" class="sakura-icon mr-1 inline-block" i-mdi-folder-open-outline />
      <span v-if="index > 0" class="mx-1">/</span> {{ category }}
    </RouterLink>
  </div>
</template>

<style last="scss">
.sakura-post-categories {
  font-size: 14px;

  a {
    color: var(--sakura-color-text);
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--sakura-color-action);
    }
  }
}
</style>
