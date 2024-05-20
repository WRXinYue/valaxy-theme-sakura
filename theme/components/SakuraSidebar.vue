<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { onMounted, onUnmounted } from 'vue'
import { useCssVar } from '@vueuse/core'
import type { NavItem, SidebarMulti } from '../types'

const props = withDefaults(defineProps<{
  showHamburger?: boolean
  sidebar?: NavItem[] | SidebarMulti
  defaultOpen?: boolean
  navbarMl?: string
}>(), {
  showHamburger: true,
  defaultOpen: false,
  navbarMl: '2rem',
})

const app = useAppStore()

onMounted(() => {
  app.isSidebarOpen = props.defaultOpen

  if (props.showHamburger)
    useCssVar('--navbar-ml').value = props.navbarMl
})

onUnmounted(() => {
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
      class="sakura-sidebar transition inset-y-0 overflow-y-auto"
      :class="[app.isSidebarOpen && 'open', !showHamburger && 'md:translate-x-0']"
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

.sakura-sidebar {
  width: calc(100vw - 64px);
  z-index: 1000;
  max-width: var(--st-c-sidebar-width);
  background-image: var(--st-c-sidebar-bg-img);
  background-position: bottom 1rem center;
  transition: box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration), opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1) !important;

  &.open {
    transform: translateX(0);
  }
}
</style>
