<script lang="ts" setup>
import { ref } from 'vue'
import type { Category, Post } from 'valaxy'
import { isCategoryList } from 'valaxy'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  // to eliminate the warning
  category: Category
  level?: number
  displayCategory?: (category: string) => void

  /**
   * collapse children
   */
  collapsable?: boolean
}>(), {
  collapsable: true,
})

const collapsable = ref(props.collapsable)
const { t, locale } = useI18n()

function getTitle(post: Post | any) {
  const lang = locale.value
  const localeTitle = post[`title_${lang}`] || post[`title_${lang.split('-')[0]}`]
  return localeTitle || post.title
}
</script>

<template>
  <li v-if="category.total" w="full" class="sakura-sidebar-group inline-flex items-center justify-between" tabindex="0">
    <span font="bold" m="l-1" @click="displayCategory ? displayCategory(category.name) : null">
      {{ category.name === 'Uncategorized' ? t('category.uncategorized') : t(`category.${category.name}`) }}
      <!-- <sup font="normal">[{{ category.total }}]</sup> -->
    </span>
    <button
      tabindex="0" role="button" aria-label="toggle section"
      class="folder-action caret inline-flex cursor-pointer"
      @click="collapsable = !collapsable"
    >
      <div class="i-fa6-solid-angle-down mr-4 h-3 w-3" :class="collapsable ? 'angle-down' : 'angle-right'" />
    </button>
  </li>

  <ul v-show="!collapsable" class="sakura-sidebar-section">
    <li v-for="categoryItem, i in category.children.values()" :key="i" class="sakura-sidebar-item">
      <template v-if="!isCategoryList(categoryItem)">
        <RouterLink v-if="categoryItem.title" :to="categoryItem.path || ''" class="sakura-sidebar-item-link inline-flex items-center" active-class="active">
          <span text="sm" class="color-$st-c-text-secondary hover:color-$st-c-text">{{ getTitle(categoryItem) }}</span>
        </RouterLink>
      </template>

      <SakuraSidebarCategory v-else :category="categoryItem" :display-category="displayCategory" :collapsable="collapsable" />
    </li>
  </ul>
</template>

<style lang="scss">
.angle-right {
  transform: rotate(0deg);
}

.angle-down {
  transform: rotate(-90deg);
}

.angle-right,
.angle-down {
  transition: transform 0.15s cubic-bezier(0.9, 0, 0.2, 0);
}
</style>
