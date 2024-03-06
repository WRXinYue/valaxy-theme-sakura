<script lang="ts" setup>
import { computed } from 'vue'
import { removeItemFromCategory, useCategories, usePageList, useSidebar } from 'valaxy'
import { useThemeConfig } from '../composables'

const pages = usePageList()
const themeConfig = useThemeConfig()

const sidebar = computed(() => themeConfig.value.sidebar)
const cs = useCategories('', pages.value)
const categories = computed(() => {
  const cList = cs.value
  removeItemFromCategory(cList, 'Uncategorized')

  const sidebar = themeConfig.value.sidebar
  if (sidebar) {
    cList.children.forEach((item) => {
      if (!themeConfig.value.sidebar.includes(item.name))
        removeItemFromCategory(cList, item.name)
    })
  }

  return cList
})

const { hasSidebar } = useSidebar()
</script>

<template>
  <aside v-if="hasSidebar" @click.stop>
    <div text="left" m="2">
      <ul v-for="item in sidebar" :key="item">
        <template v-if="typeof item === 'string'">
          <PressCategoryByName
            :categories="categories"
            :item="item"
          />
        </template>
        <!-- <PressSidebarItem v-else p="t-2" border="t t-$pr-c-divider-light" :item="item" :depth="0" /> -->
      </ul>
    </div>
  </aside>
</template>
