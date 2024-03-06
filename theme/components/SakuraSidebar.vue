<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { checkRouteAgainstConditions } from '../utils'

defineProps<{
  showHamburger?: boolean
}>()

const app = useAppStore()
const route = useRoute()
const themeConfig = useThemeConfig()

const isShowSidebarHamburger = ref()

onMounted(() => {
  const isSidebarDefaultOpen = checkRouteAgainstConditions(route, themeConfig.value.sidebarDefaultOpen)
  isShowSidebarHamburger.value = checkRouteAgainstConditions(route, themeConfig.value.sidebarHamburger)
  app.isSidebarOpen = isSidebarDefaultOpen
})
</script>

<template>
  <div>
    <ValaxyOverlay class="md:hidden z-1" :show="app.isSidebarOpen" @click="app.toggleSidebar()" />

    <SakuraHamburger
      v-if="isShowSidebarHamburger"
      :active="app.isSidebarOpen"
      class="menu-btn sidebar-toggle sakura-icon-btn leading-4 fixed left-0.8rem top-4 z-2000 "
      inline-flex cursor="pointer"
      :class="showHamburger ? '' : 'md:hidden'" @click="app.toggleSidebar()"
    />

    <aside
      class="va-card transition sidebar fixed inset-y-0 left-0 overflow-y-auto z-500"
      :class="[app.isSidebarOpen && 'open', !showHamburger && 'md:translate-x-0',
               themeConfig.layout.nav === 'top-left' && 'mt-$st-c-navbar-height']"
      text="center" bg="$st-c-sidebar-bg-color contain no-repeat"
    >
      <div v-if="!$slots.default" :class="$slots.default && '-mt-4'">
        <SakuraSidebarOverview v-if="themeConfig.layout.sidebar === 'overview'" />
        <SakuraSidebarDynamic v-else-if="themeConfig.layout.sidebar === 'dynamic'" />
      </div>

      <div v-else>
        <slot />
      </div>
    </aside>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.sidebar {
  width: calc(100vw - 64px);
  max-width: var(--va-sidebar-width);
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
