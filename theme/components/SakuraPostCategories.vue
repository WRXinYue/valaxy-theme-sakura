<script lang="ts" setup>
import type { Post } from 'valaxy'
import { computed } from 'vue'
import { homeCategoryLink } from '../composables'

const props = defineProps<{
  categories: Post['categories']
}>()

const category = computed(() => Array.isArray(props.categories)
  ? props.categories[0]
  : props.categories)
</script>

<template>
  <div v-if="category" class="sakura-post-categories">
    <RouterLink :to="homeCategoryLink(category)" class="inline-flex items-center align-top">
      <span class="sakura-icon mr-1 inline-block" i-mdi-folder-open-outline />
      {{ category }}
    </RouterLink>
  </div>
</template>

<style lang="scss">
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
