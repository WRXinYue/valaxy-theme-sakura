<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { checkRouteAgainstConditions } from '../utils'
import type { Layout, NavItem, SidebarMulti } from '../types'

const props = withDefaults(defineProps<{
  showHamburger?: boolean
  fixed?: boolean
  layout?: Layout
  sidebar?: NavItem[] | SidebarMulti
}>(), {
  fixed: true,
  showHamburger: true,
})

const app = useAppStore()
const route = useRoute()
const themeConfig = useThemeConfig()

const layout = computed(() => props.layout || themeConfig.value.layout as Layout)
const isShowPCSidebarHamburger = computed(() => {
  if (typeof window === 'undefined')
    return

  if (window.innerWidth > 768)
    return checkRouteAgainstConditions(route, themeConfig.value.sidebarPCOptions.hamburger)
  else
    return checkRouteAgainstConditions(route, themeConfig.value.sidebarMobileOptions.hamburger)
})

onMounted(() => {
  if (window.innerWidth > 768) {
    const isPCSidebarDefaultOpen = checkRouteAgainstConditions(route, themeConfig.value.sidebarPCOptions.defaultOpen)
    app.isSidebarOpen = isPCSidebarDefaultOpen
  }
  else {
    app.isSidebarOpen = false
  }
})
</script>

<template>
  <ValaxyOverlay class="md:hidden z-1" :show="app.isSidebarOpen" @click="app.toggleSidebar()" />

  <SakuraHamburger
    v-if="isShowPCSidebarHamburger"
    :active="app.isSidebarOpen"
    class="menu-btn sidebar-toggle sakura-icon-btn leading-4 fixed left-0.8rem top-4 z-1001"
    inline-flex cursor="pointer"
    :class="showHamburger ? '' : 'md:hidden'" @click="app.toggleSidebar()"
  />

  <aside
    class="va-card transition sidebar inset-y-0 left-0 overflow-y-auto z-1000"
    :class="[app.isSidebarOpen && 'open', !showHamburger && 'md:translate-x-0',
             layout.nav === 'top-left' && 'mt-$st-c-navbar-height',
             fixed && 'fixed']"
    text="center" bg="$st-c-sidebar-bg-color contain no-repeat"
  >
    <slot>
      <SakuraSidebarCustom />
    </slot>
  </aside>
</template>

<style lang="scss">
@use "sass:map";

.sidebar {
  width: calc(100vw - 64px);
  max-width: var(--st-c-sidebar-width);
  background-image: var(--st-c-sidebar-bg-img);
  background-position: bottom 1rem center;
  transform: translateX(-100%);
  transition: box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration), opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1) !important;

  &.open {
    transform: translateX(0);
  }
}
</style>
