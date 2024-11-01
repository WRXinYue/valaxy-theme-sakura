<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { computed, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useLayout, useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'
import type { NavItem, NavbarOptions } from '../types/index'

const props = defineProps<{
  navbar?: NavItem[]
  options?: NavbarOptions
}>()

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()
const { isIncludes } = useLayout()
const { y } = useWindowScroll()

const noAnimation = ref(true)

const hoverNavbar = ref(false)

const navbar = computed(() => props.navbar || themeConfig.value.navbar)
const navbarOptions = computed(() => props.options || themeConfig.value.navbarOptions)

const { autoHide, favicon, animIn, animOut, showMarker, title, enableHover, offset } = navbarOptions.value

const isScrolled = computed(() => y.value > offset)

const isHeaderHighlighted = computed(() => {
  const autoHide = isIncludes(navbarOptions.value.autoHide)
  if (!autoHide)
    return true

  const invert = isIncludes(navbarOptions.value.invert)

  if (enableHover)
    return hoverNavbar.value || (invert ? isScrolled.value : !isScrolled.value)
  return invert ? isScrolled.value : !isScrolled.value
})
</script>

<template>
  <header
    class="sakura-navbar" :class="{ 'active-header': isHeaderHighlighted, 'has-scrolled': isScrolled, 'no-animation': noAnimation }"
    @mouseover="hoverNavbar = true" @mouseleave="hoverNavbar = false"
  >
    <slot name="brand">
      <div class="flex items-center">
        <div
          v-if="themeConfig.sidebarOptions?.position === 'left'"
          :class="!themeConfig.sidebarOptions.enableOnDesktop && 'md:hidden'"
        >
          <SakuraHamburger class="mr-4" :active="sakuraAppStore.sidebar.isOpen" @click="sakuraAppStore.sidebar.toggle" />
        </div>

        <SakuraNavbarBrand :favicon :title />
      </div>
    </slot>

    <slot name="link">
      <SakuraNavbarLink :class="autoHide && (isHeaderHighlighted ? animIn : animOut)" :navbar :show-marker />
    </slot>

    <slot name="tool">
      <div flex print:op0>
        <SakuraToggleTheme v-if="navbarOptions.tools.includes('toggleTheme')" mr-2 />
        <SakuraToggleLocale v-if="navbarOptions.tools.includes('toggleLocale')" mr-2 />
        <SakuraSearchTrigger v-if="siteConfig.search.enable ?? navbarOptions.tools.includes('search')" />
        <div v-if="themeConfig.sidebarOptions?.position === 'right'" i-ri-menu-4-fill mr-2 @click="sakuraAppStore.sidebar.toggle" />
      </div>
    </slot>
  </header>
</template>

<style lang="scss">
.sakura-navbar {
  position: fixed;
  z-index: 100;
  height: var(--sakura-navbar-height);
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease !important;
  padding-left: max(40px, env(safe-area-inset-left));
  padding-right: max(40px, env(safe-area-inset-right));

  &.active-header {
    background: var(--sakura-nav-bg-color);
  }

  // &:not(&.active-header) {
  //   .sakura-nav-link {
  //     display: none;
  //   }
  // }
}
</style>
