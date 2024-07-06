<script lang="ts" setup>
import { computed } from 'vue'
import { removeItemFromCategory, useCategories, usePageList, useSidebar } from 'valaxy'
import type { SidebarMulti } from '../../types'
import { useThemeConfig } from '../../composables'

const props = withDefaults(defineProps<{
  sidebar?: SidebarMulti
}>(), {})

const themeConfig = useThemeConfig()

const pages = usePageList()

const cs = useCategories('', pages.value)

const sidebar = computed(() => props.sidebar || themeConfig.value.sidebar)

const categories = computed(() => {
  const cList = cs.value
  // Remove the "Unclassified" category
  removeItemFromCategory(cList, 'Uncategorized')

  if (sidebar.value) {
    cList.children.forEach((item) => {
      if (!sidebar.value.includes(item.name))
        removeItemFromCategory(cList, item.name)
    })
  }

  return cList
})

const { hasSidebar } = useSidebar()
</script>

<template>
  <aside v-if="hasSidebar" class="sidebar-theme-dynamic" @click.stop>
    <ol v-for="(item, i) in sidebar" :key="i" text="left">
      <template v-if="typeof item === 'string'">
        <SakuraSidebarCategoryByName
          :categories="categories"
          :item="item"
        />
      </template>
      <PressSidebarItem v-else :item="item" :depth="0" />
    </ol>
  </aside>
</template>

<style lang="scss">
.sidebar-theme-dynamic > :not(:first-child) {
  margin-top: 16px;
}
</style>
