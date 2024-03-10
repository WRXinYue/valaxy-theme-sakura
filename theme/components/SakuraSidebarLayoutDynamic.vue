<script lang="ts" setup>
import { computed } from 'vue'
import { removeItemFromCategory, useCategories, usePageList, useSidebar } from 'valaxy'

const props = withDefaults(defineProps<{
  sidebar: any
}>(), {
})

const pages = usePageList()

const cs = useCategories('', pages.value)
const categories = computed(() => {
  const cList = cs.value
  removeItemFromCategory(cList, 'Uncategorized')

  if (props.sidebar) {
    cList.children.forEach((item) => {
      if (!props.sidebar.includes(item.name))
        removeItemFromCategory(cList, item.name)
    })
  }

  return cList
})

const { hasSidebar } = useSidebar()
</script>

<template>
  <aside v-if="hasSidebar" @click.stop>
    <ul v-for="item in sidebar" :key="item" text="left" m="2">
      <SakuraSidebarCategoryByName
        :categories="categories"
        :item="item"
      />
    </ul>
  </aside>
</template>
