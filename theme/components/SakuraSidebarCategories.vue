<script lang="ts" setup>
import { useCategories } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const categories = useCategories()
const { t } = useI18n()
const router = useRouter()

function jumpToCategory(categoryName: string) {
  router.push({
    path: '/categories/',
    query: { category: categoryName },
  })
}
</script>

<template>
  <SakuraSidebarCard class="sakura-sidebar-categories" mt-4 icon="i-ri-folder-2-line" :title="t('menu.categories')">
    <ul class="sakura-sidebar-category-list px-2">
      <li v-for="category in categories.children.values()" :key="category.name" class="sidebar-category-item">
        <a class="sidebar-category-link" @click="jumpToCategory(category.name)">
          <span class="category-name">{{ category.name === 'Uncategorized' ? t('category.uncategorized') : category.name }}</span>
          <span class="category-count">{{ category.total }}</span>
        </a>
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
