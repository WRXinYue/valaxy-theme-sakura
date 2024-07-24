<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useCategories, useSiteStore, useTags } from 'valaxy'
import type { NavItem } from '../../types'
import { useThemeConfig } from '../../composables'

const props = defineProps<{
  sidebar?: NavItem[]
}>()

const { t } = useI18n()
const site = useSiteStore()
const categories = useCategories()
const tags = useTags()
const themeConfig = useThemeConfig()
const route = useRoute()

const marker = ref()

const sidebar = computed(() => props.sidebar || themeConfig.value.sidebar) as unknown as NavItem[]

watch(() => route.path, () => nextTick(() => updateMarker()))

function updateMarker() {
  const routeActive = document.querySelector('.sakura-sidebar .site-link .router-link-active') as HTMLElement
  // const sidebarTop = document.querySelector('.sakura-sidebar .site-link') as HTMLElement

  marker.value.style.top = `${routeActive?.offsetTop || 0}px`
  marker.value.style.height = `${routeActive?.offsetHeight || 0}px`
}

onMounted(() => {
  nextTick(() => updateMarker())
  marker.value = document.querySelector('.sakura-sidebar #marker')
})
</script>

<template>
  <nav class="site-link sidebar-theme-overview" text-xl>
    <RouterLink v-for="(item, i) in sidebar" :key="i" class="site-link-item" :to="item.link" :title="item.text || t(item.locale || '')">
      <div class="icon" :class="item.icon" />
      <span ml-1 text-base>
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

    <div id="marker" />
  </nav>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sidebar-theme-overview {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}

.site-link-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
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
