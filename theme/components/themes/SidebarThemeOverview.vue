<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { NavItem } from '../../types'
import { useThemeConfig } from '../../composables'

const props = defineProps<{
  sidebar?: NavItem[]
}>()

const { t } = useI18n()
const themeConfig = useThemeConfig()
const route = useRoute()

const marker = ref()

const sidebar = computed(() => props.sidebar || themeConfig.value.sidebar) as unknown as NavItem[]

watch(() => route.path, () => nextTick(() => updateMarker()))

function updateMarker() {
  const routeActive = document.querySelector('.sidebar-theme-overview .router-link-active') as HTMLElement
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
  <nav class="sidebar-theme-overview">
    <ul class="sakura-sidebar-menu">
      <li v-for="(item, i) in sidebar" :key="i" class="sakura-menu-item">
        <AppLink :to="item.link" :title="item.locale ? `${item.text} ${t(item.locale)}` : item.text">
          <span v-if="item.icon" class="icon" inline-block :class="item.icon" />
          {{ item.locale ? `${item.text} ${t(item.locale)}` : item.text }}
          <SakuraSidebarCount :locale="item.locale" />
        </AppLink>

        <ul class="sakura-sub-menu">
          <li>
            <AppLink v-for="(itemChildren, i) in item.children" :key="i" :to="itemChildren.link" :title="itemChildren.locale ? `${itemChildren.text} ${t(itemChildren.locale)}` : itemChildren.text">
              <span v-if="itemChildren.icon" class="icon" inline-block :class="itemChildren.icon" />
              {{ itemChildren.locale ? `${itemChildren.text} ${t(itemChildren.locale)}` : itemChildren.text }}
              <SakuraSidebarCount :locale="itemChildren.locale" />
            </AppLink>
          </li>
        </ul>
      </li>
    </ul>

    <div id="marker" />
  </nav>
</template>

<style lang="scss">
.sidebar-theme-overview {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;

  .sakura-sidebar-menu {
    .sakura-menu-item a {
      display: flex;
      padding: 4px 15px;

      .icon {
        width: 1.2rem;
        height: 1.2rem;

        &:hover {
          color: var(--va-c-primary-light);
        }
      }
    }

    .sakura-menu-item > a {
      color: var(--va-c-text);
      font-size: 15px;
      letter-spacing: 0.02em;
    }
  }
}
</style>
