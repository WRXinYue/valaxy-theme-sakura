<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useAppStore } from 'valaxy'
import { useThemeConfig } from '../composables'

const { invert, autoHide } = withDefaults(defineProps<{
  favicon?: boolean
  title?: string | string[]
  invert?: boolean
  col?: boolean
  autoHide?: boolean
  animIn?: string | string[]
  animOut?: string | string[]
}>(), {
  favicon: undefined,
  invert: false,
  col: false,
  autoHide: false,
  animIn: 'animation-fade-in-left',
  animOut: 'animation-fade-out-left',
})

const app = useAppStore()
const themeConfig = useThemeConfig()

const hoverNavbar = ref(false)
const scrolled = ref(false)

const isHeaderHighlighted = computed(() => {
  if (!autoHide)
    return true

  return hoverNavbar.value || (invert ? scrolled.value : !scrolled.value)
})

function handleScroll() {
  scrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="sakura-navbar" :class="{ 'active-header': isHeaderHighlighted, 'col': col }"
    @mouseover="hoverNavbar = true" @mouseleave="hoverNavbar = false"
  >
    <slot name="nav-brand">
      <div class="flex items-center">
        <div :class="!themeConfig.navbarOptions?.showSidebarToggleButtonOnPC && 'md:hidden'">
          <SakuraHamburger class="mr-4" :active="app.isSidebarOpen" @click="app.isSidebarOpen = !app.isSidebarOpen" />
        </div>

        <SakuraNavbarBrand :favicon="favicon ?? themeConfig.favicon" :navbar-title="title || themeConfig.navbarTitle" />
      </div>
    </slot>

    <slot name="nav-link">
      <SakuraNavLink :class="autoHide && (isHeaderHighlighted ? animIn : animOut)" :col="col" />
    </slot>

    <slot name="nav-tool">
      <SakuraToggleTheme />
    </slot>
  </header>
</template>
