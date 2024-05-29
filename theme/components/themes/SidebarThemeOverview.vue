<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCategories, useSiteStore, useTags } from 'valaxy'
import type { NavItem } from '../../types'
import { useThemeConfig } from '../../composables'

const props = defineProps({
  sidebar: Array<NavItem>,
})

const { t } = useI18n()

const site = useSiteStore()

const categories = useCategories()
const tags = useTags()
const themeConfig = useThemeConfig()

const sidebar = computed(() => props.sidebar || themeConfig.value.sidebar) as unknown as NavItem[]
</script>

<template>
  <nav class="sidebar-theme-overview" text-xl>
    <RouterLink v-for="(item, i) in sidebar" :key="i" class="site-link-item" :to="item.link" :title="item.text || t(item.locale || '')">
      <div class="icon" :class="item.icon" />
      <span text-base ml-1>
        <template v-if="item.locale === 'menu.archives'">
          {{ t('menu.archives') }}
          {{ site.postList.length }}
        </template>
        <template v-else-if="item.locale === 'menu.categories'">
          {{ t('menu.categories') }}
          {{ Array.from(categories.children).length }}
        </template>
        <template v-else-if="item.locale === 'menu.tags'">
          {{ t('menu.tags') }}
          {{ Array.from(tags).length }}
        </template>
        <template v-else>
          {{ item.text }}
        </template>
      </span>
    </RouterLink>
  </nav>
</template>

<style lang="scss">
@use "valaxy/client/styles/mixins/index.scss" as *;

.sidebar-theme-overview {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}

.site-link-item {
  display: flex;
  padding: 0 15px;
  align-items: center;
  color: var(--va-c-text);

  .count {
    color: var(--va-c-text);
    font-family: var(--va-font-sans);
    display: block;
    text-align: center;
    font-size: 1rem;
  }

  .icon {
    width: 1.2rem;
    height: 1.2rem;

    &:hover {
      color: var(--va-c-primary-light);
    }
  }
}
</style>
