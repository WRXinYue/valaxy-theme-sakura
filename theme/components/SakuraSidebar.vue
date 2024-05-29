<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useAppStore } from 'valaxy'

let sidebarElement: HTMLElement | null = null

const app = useAppStore()

onMounted(() => {
  sidebarElement = document.querySelector('.sidebar.grid-layout-triple-columns')

  updateSidebarLayout(app.isSidebarOpen)
})

watch(() => app.isSidebarOpen, (open) => {
  updateSidebarLayout(open)
})

function updateSidebarLayout(open: boolean) {
  if (!sidebarElement)
    return

  open ? sidebarElement.classList.add('open') : sidebarElement.classList.remove('open')
}
</script>

<template>
  <div>
    <ValaxyOverlay class="md:hidden z-1" :show="app.isSidebarOpen" @click="app.toggleSidebar()" />

    <aside
      class="sakura-sidebar transition inset-y-0 overflow-y-auto"
      :class="[app.isSidebarOpen && 'open']"
      text="center" bg="contain no-repeat"
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
  z-index: 1000;
  max-width: var(--st-c-sidebar-width);
  background-image: var(--st-c-sidebar-bg-img);
  background-position: bottom 1rem center;
  transition: box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration), opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1) !important;
}
</style>
