<script lang="ts" setup>
import { computed } from 'vue'
import { removeItemFromCategory, useCategories, usePageList } from 'valaxy'
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

// const { hasSidebar } = useSidebar()
</script>

<template>
  <!-- <aside v-if="hasSidebar" @click.stop> -->
  <aside @click.stop>
    <ul v-for="(item, i) in sidebar" :key="i" text="left" m="2">
      <template v-if="typeof item === 'string'">
        <SakuraSidebarCategoryByName
          :categories="categories"
          :item="item"
        />
      </template>
      <PressSidebarItem v-else :item="item" :depth="0" />
    </ul>
  </aside>
</template>
