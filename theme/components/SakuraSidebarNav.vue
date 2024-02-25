<script lang="ts" setup>
import { useCategories, useSiteStore, useTags } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useThemeConfig } from '../composables'

const { t } = useI18n()

const site = useSiteStore()

const themeConfig = useThemeConfig()
const categories = useCategories()
const tags = useTags()
</script>

<template>
  <nav class="site-nav" text-xl mt-6>
    <ul>
      <RouterLink v-for="(item, i) in themeConfig.sidebar" :key="i" class="site-link-item" :to="item.link" :title="item.text || t(item.locale || '')">
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
    </ul>
  </nav>
</template>

<style lang="scss">
@use "valaxy/client/styles/mixins/index.scss" as *;

.site-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  line-height: 1.5;
  white-space: nowrap;
  text-align: center;
  margin-top: 1rem;
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
