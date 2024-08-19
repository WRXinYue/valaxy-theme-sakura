<script lang="ts" setup>
import { useCategories, useSiteStore, useTags } from 'valaxy'
import { useThemeConfig } from '../composables'

defineProps<{
  locale: string
}>()

const site = useSiteStore()
const categories = useCategories()
const tags = useTags()
const themeConfig = useThemeConfig()
</script>

<template>
  <template v-if="themeConfig.sidebarOptions.showCounts">
    <sup v-if="locale === 'menu.archives'" class="sakura-count"> {{ site.postList.length }} </sup>
    <sup v-else-if="locale === 'menu.categories'" class="sakura-count"> {{ Array.from(categories.children).length }} </sup>
    <sup v-else-if="locale === 'menu.tags'" class="sakura-count"> {{ Array.from(tags).length }} </sup>
  </template>
</template>

<style lang="scss">
.sakura-count {
  color: var(--va-c-text);
  font-family: var(--va-font-sans);
  display: block;
  text-align: center;
  font-size: 1rem;
}
</style>
