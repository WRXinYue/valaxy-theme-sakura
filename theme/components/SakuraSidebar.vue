<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { checkRouteAgainstConditions } from '../utils'

defineProps<{
  showHamburger?: boolean
}>()

const app = useAppStore()
const route = useRoute()
const themeConfig = useThemeConfig()

onMounted(() => {
  const isSidebarDefaultOpen = checkRouteAgainstConditions(route, themeConfig.value.sidebarDefaultOpen)
  if (isSidebarDefaultOpen)
    app.isSidebarOpen = true
})
</script>

<template>
  <ValaxyOverlay class="md:hidden z-1" :show="app.isSidebarOpen" @click="app.toggleSidebar()" />

  <SakuraHamburger
    :active="app.isSidebarOpen"
    class="menu-btn sidebar-toggle sakura-icon-btn leading-4 fixed left-0.8rem top-4 z-2000"
    inline-flex cursor="pointer"
    :class="showHamburger ? '' : 'md:hidden'" @click="app.toggleSidebar()"
  />

  <aside
    class="va-card transition sidebar fixed inset-y-0 left-0 overflow-y-auto z-500"
    :class="[app.isSidebarOpen && 'open', !showHamburger && 'md:translate-x-0']"
    text="center" bg="$st-c-sidebar-bg-color contain no-repeat"
  >
    <div v-if="!$slots.default" :class="$slots.default && '-mt-4'">
      <SakuraOverview />
    </div>

    <div v-else>
      <slot />
    </div>
  </aside>
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
