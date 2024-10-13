<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'
import type { NavItem, NavbarOptions } from '../types/index'

const props = withDefaults(defineProps<{
  navbar?: NavItem[]
  favicon?: boolean
  title?: string | string[]
  invert?: boolean
  autoHide?: boolean
  showMarker?: boolean
  animIn?: string | string[]
  animOut?: string | string[]
} & NavbarOptions>(), {
  favicon: undefined,
  invert: false,
  autoHide: false,
  animIn: 'animation-fade-in-left',
  animOut: 'animation-fade-out-left',
})

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()

const hoverNavbar = ref(false)
const scrolled = ref(false)

const title = computed(() => props.title || themeConfig.value.navbarOptions?.title || themeConfig.value.navbarTitle)
const invert = computed(() => themeConfig.value.navbarOptions?.invert ?? props.invert)
const autoHide = computed(() => themeConfig.value.navbarOptions?.autoHide ?? props.autoHide)
const animIn = computed(() => themeConfig.value.navbarOptions?.animIn ?? props.animIn)
const animOut = computed(() => themeConfig.value.navbarOptions?.animOut ?? props.animOut)
const isHeaderHighlighted = computed(() => {
  if (!autoHide.value)
    return true
  if (themeConfig.value.navbarOptions?.activeHeader?.enableHover) {
    return hoverNavbar.value || (invert.value ? scrolled.value : !scrolled.value)
  }
  return invert.value ? scrolled.value : !scrolled.value
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
    class="sakura-navbar" :class="{ 'active-header': isHeaderHighlighted }"
    @mouseover="hoverNavbar = true" @mouseleave="hoverNavbar = false"
  >
    <slot name="nav-brand">
      <div class="flex items-center">
        <div
          v-if="themeConfig.sidebarOptions?.position === 'left'"
          :class="!themeConfig.sidebarOptions.enableOnDesktop && 'md:hidden'"
        >
          <SakuraHamburger class="mr-4" :active="sakuraAppStore.sidebar.isOpen" @click="sakuraAppStore.sidebar.toggle" />
        </div>

        <SakuraNavbarBrand :favicon="favicon ?? themeConfig.favicon" :navbar-title="title" />
      </div>
    </slot>

    <slot name="nav-link">
      <SakuraNavLink :class="autoHide && (isHeaderHighlighted ? animIn : animOut)" :navbar :show-marker />
    </slot>

    <slot name="nav-tool">
      <div flex print:op0>
        <SakuraToggleTheme mr-2 />
        <SakuraToggleLocale mr-2 />
        <div v-if="themeConfig.sidebarOptions?.position === 'right'" i-ri-menu-4-fill mr-2 @click="sakuraAppStore.sidebar.toggle" />
      </div>
    </slot>
  </header>
</template>

<style lang="scss">
.sakura-navbar {
  position: fixed;
  z-index: 5;
  height: var(--sakura-c-navbar-height);
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease !important;
  padding-left: max(40px, env(safe-area-inset-left));
  padding-right: max(40px, env(safe-area-inset-right));

  &.active-header {
    background: var(--sakura-c-bg-nav);
  }
}
</style>
