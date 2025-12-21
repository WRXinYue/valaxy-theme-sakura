<script lang="ts" setup>
import type { Categories } from 'valaxy'
import { isCategoryList } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRoute } from 'vue-router'
import { useCategoryState } from '../composables'

const props = withDefaults(defineProps<{
  categories: Categories
  /**
   * 当前层级
   */
  level?: number
  collapsable?: boolean
}>(), {
  level: 0,
  collapsable: true,
})

const route = useRoute()
const { t } = useI18n()
const categoryList = computed(() => {
  const c = route.query.category || ''
  return Array.isArray(c) ? [c] : c.split('/')
})

const { expandAll, collapseAll } = useCategoryState()

// Recursively find all category keys (folders)
function collectKeys(categories: Categories, parentKey = ''): string[] {
  let keys: string[] = []
  for (const item of categories.values()) {
    if (isCategoryList(item)) {
      const currentKey = parentKey ? `${parentKey}/${item.name}` : item.name
      keys.push(currentKey)
      keys = keys.concat(collectKeys(item.children, currentKey))
    }
  }
  return keys
}

function handleExpandAll() {
  const keys = collectKeys(props.categories)
  expandAll(keys)
}

function handleCollapseAll() {
  collapseAll()
}
</script>

<template>
  <div v-if="level === 0" class="category-actions mb-2 flex gap-2 px-4">
    <button class="action-btn" :title="t('category.expand_all')" @click="handleExpandAll">
      <div i-ri-folder-add-line />
      <span class="ml-1 text-xs">{{ t('category.expand_all') }}</span>
    </button>
    <button class="action-btn" :title="t('category.collapse_all')" @click="handleCollapseAll">
      <div i-ri-folder-reduce-line />
      <span class="ml-1 text-xs">{{ t('category.collapse_all') }}</span>
    </button>
  </div>

  <ul v-for="category in categories.values()" :key="category.name" class="category-list" m="l-4">
    <SakuraCategory
      :parent-key="category.name"
      :category="category"
      :level="level + 1"
      :collapsable="!categoryList.includes(category.name)"
    />
  </ul>
</template>

<style lang="scss" scoped>
.category-actions {
  display: flex;
  justify-content: flex-end;
}

.action-btn {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--sakura-color-divider);
  border-radius: 4px;
  background-color: transparent;
  color: var(--sakura-color-text-secondary);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--sakura-color-primary);
    border-color: var(--sakura-color-primary);
    background-color: var(--sakura-color-bg-hover);
  }
}

.sakura-sidebar-item {
  a {
    color: var(--va-c-text-lighter);

    &:hover {
      color: var(--sakura-color-primary);
    }
  }
}

.category-list-item {
  .folder-action {
    &:hover {
      color: var(--sakura-color-primary);
    }
  }

  .category-name {
    &:hover {
      color: var(--sakura-color-primary);
    }
  }
}
</style>
