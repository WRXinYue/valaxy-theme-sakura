<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useAppStore } from 'valaxy'
import { useRoute } from 'vue-router'

let sidebarElement: HTMLElement | null = null

const app = useAppStore()
const route = useRoute()

const marker = ref()

onMounted(() => {
  sidebarElement = document.querySelector('.sidebar.grid-layout-triple-columns')

  updateSidebarLayout(app.isSidebarOpen)
})

watch(() => app.isSidebarOpen, (open) => {
  updateSidebarLayout(open)
})

watch(() => route.path, () => {
  nextTick(updateMarker)
})

function updateSidebarLayout(open: boolean) {
  if (!sidebarElement)
    return

  open ? sidebarElement.classList.add('open') : sidebarElement.classList.remove('open')
}

function updateMarker() {
  const routeActive = document.querySelector('.sakura-sidebar .router-link-active') as HTMLElement
  if (!routeActive)
    return

  marker.value.style.top = `${routeActive.offsetTop}px`
  marker.value.style.height = `${routeActive.offsetHeight}px`
  // if (col) {
  //   marker.value.style.top = `${routeActive.offsetTop}px`
  //   marker.value.style.height = `${routeActive.offsetHeight}px`
  // }
  // else {
  //   marker.value.style.left = `${routeActive.offsetLeft}px`
  //   marker.value.style.width = `${routeActive.offsetWidth}px`
  // }
}

onMounted(() => {
  nextTick(() => {
    marker.value = document.querySelector('.sakura-sidebar #marker')
    updateMarker()
  })
})
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
        <SakuraSiteInfoCard />
        <SakuraSocialLinks />
        <SidebarThemeOverview class="mt-4" />
      </slot>
    </aside>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.sakura-sidebar {
  position: fixed;
  transform: translateX(-100%);
  z-index: 1000;
  padding-top: 30px;
  width: var(--st-c-sidebar-width);
  background-image: var(--st-c-sidebar-bg-img);
  background-position: bottom 1rem center;
  background-color: var(--st-c-sidebar-bg-color);
  transition: box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration), opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1) !important;

  &.open {
    transform: translateX(0);
  }

  #marker {
    position: absolute;
    transition-property: opacity, left, top;
    transition-duration: 0.5s;
    pointer-events: none;
    height: 100%;
  }
}
</style>
