<script lang="ts" setup>
import { useCategories, useValaxyI18n } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { homeCategoryLink } from '../composables'

const categories = useCategories()
const { t } = useI18n()
const { $tCategory } = useValaxyI18n()
</script>

<template>
  <SakuraSidebarCard class="sakura-sidebar-categories" icon="i-ri-folder-2-line" :title="t('menu.categories')">
    <ul class="sakura-sidebar-category-list px-2">
      <li v-for="category in categories.children.values()" :key="category.name" class="sidebar-category-item">
        <RouterLink class="sidebar-category-link" :to="homeCategoryLink(category.name)">
          <span class="category-name">{{ category.name === 'Uncategorized' ? t('category.uncategorized') : $tCategory(category.name) }}</span>
          <span class="category-count">{{ category.total }}</span>
        </RouterLink>
      </li>
    </ul>
  </SakuraSidebarCard>
</template>

<style lang="scss" scoped>
.sakura-sidebar-category-list {
  list-style: none;
  margin: 0;
}

.sidebar-category-item {
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  font-size: 0.75rem;
  background-color: var(--sakura-color-muted-background);
  border-radius: 4px;
  color: var(--sakura-color-text-muted);
  transition: all 0.3s;
}

.sidebar-category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--sakura-color-text);
  transition: color 0.3s;
  font-size: 0.85rem;

  &:hover {
    color: var(--sakura-color-primary);

    .category-count {
      color: var(--sakura-color-primary);
      opacity: 1;
    }
  }
}
</style>
