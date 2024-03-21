<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { onMounted, onUnmounted, watch } from 'vue'
import { useCssVar } from '@vueuse/core'
import type { NavItem, SidebarMulti } from '../types'

const props = withDefaults(defineProps<{
  showHamburger?: boolean
  fixed?: boolean
  layout?: 'left-top' | 'top-left'
  sidebar?: NavItem[] | SidebarMulti
  defaultOpen?: boolean
  layoutPl?: string
  navbarMl?: string
}>(), {
  fixed: true,
  showHamburger: true,
  defaultOpen: false,
  layoutPl: 'var(--st-c-sidebar-width)',
  navbarMl: '2rem',
  layout: 'left-top',
})

const app = useAppStore()

function updateLayoutPadding(isSidebarOpen: boolean) {
  const cssVarName = props.layout === 'left-top' ? '--app-container-layout-pl' : '--st-c-layout-pl'
  useCssVar(cssVarName).value = isSidebarOpen ? props.layoutPl : '0'
}

watch(() => app.isSidebarOpen, async (isSidebarOpen) => {
  updateLayoutPadding(isSidebarOpen)
})

onMounted(() => {
  app.isSidebarOpen = props.defaultOpen
  updateLayoutPadding(app.isSidebarOpen)

  if (props.showHamburger)
    useCssVar('--navbar-ml').value = props.navbarMl
})

onUnmounted(() => {
  props.layout === 'left-top' ? useCssVar('--app-container-layout-pl').value = '0' : useCssVar('--st-c-layout-pl').value = '0'
  app.isSidebarOpen = props.defaultOpen
})
</script>

<template>
  <div>
    <ValaxyOverlay class="md:hidden z-1" :show="app.isSidebarOpen" @click="app.toggleSidebar()" />

    <SakuraHamburger
      v-if="showHamburger"
      :active="app.isSidebarOpen"
      class="menu-btn sidebar-toggle sakura-icon-btn leading-4 fixed left-0.8rem top-4 z-1001"
      inline-flex cursor="pointer"
      @click="app.toggleSidebar()"
    />

    <aside
      class="va-card transition sidebar inset-y-0 left-0 overflow-y-auto z-1000"
      :class="[app.isSidebarOpen && 'open', !showHamburger && 'md:translate-x-0',
               layout === 'top-left' && 'mt-$st-c-navbar-height',
               fixed && 'fixed']"
      text="center" bg="$st-c-sidebar-bg-color contain no-repeat"
    >
      <slot>
        <SidebarThemeOverview />
      </slot>
    </aside>
  </div>
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
