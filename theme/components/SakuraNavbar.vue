<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { NavItem, NavbarOptions } from '../types/index'
import { useLayout, useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const props = defineProps<{
  navbar?: NavItem[]
  options?: NavbarOptions
}>()

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()
const { isIncludes } = useLayout()
const { y } = useWindowScroll()

const noAnimation = ref(true)

const hoverNavbar = ref(false)

const navbar = computed(() => props.navbar || themeConfig.value.navbar)
const navbarOptions = computed(() => props.options || themeConfig.value.navbarOptions)

const { autoHide, favicon, animIn, animOut, showMarker, title, subTitle, enableHover, offset } = navbarOptions.value

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
  <!-- NOTE: Dynamic :class switching affects triggering the component loader for some reason, not sure why. -->
  <header
    class="sakura-navbar" :class="{ 'active-header': isHeaderHighlighted, 'has-scrolled': isScrolled, 'no-animation': noAnimation }"
    @mouseover="hoverNavbar = true" @mouseleave="hoverNavbar = false"
  >
    <slot name="brand">
      <div class="flex items-center">
        <template v-if="themeConfig.sidebarOptions?.position === 'left'">
          <div class="flex-center" :class="!themeConfig.sidebarOptions.enableOnDesktop && 'md:hidden'">
            <template v-if="themeConfig.navbarOptions.hamburgerStyle === 'old'">
              <SakuraHamburgerOld class="mr-4" :active="sakuraAppStore.sidebar.isOpen" @click="sakuraAppStore.sidebar.toggle" />
            </template>
            <template v-if="themeConfig.navbarOptions.hamburgerStyle === 'uneven'">
              <SakuraHamburgerUneven class="mr-4" :active="sakuraAppStore.sidebar.isOpen" @click="sakuraAppStore.sidebar.toggle" />
            </template>
          </div>
        </template>

        <SakuraNavbarBrand :favicon :title :sub-title />
      </div>
    </slot>

    <slot name="link">
      <SakuraNavbarLink :class="autoHide && (isHeaderHighlighted ? animIn : animOut)" :navbar :show-marker />
    </slot>

    <slot name="tool">
      <div h-full print:op0 flex="~ center" class="sakura-navbar-tools">
        <SakuraToggleDark v-if="navbarOptions.tools.includes('toggleDark')" />
        <SakuraToggleLocale v-if="navbarOptions.tools.includes('toggleLocale')" />
        <SakuraSearchTrigger v-if="navbarOptions.tools.includes('search')" />
        <div v-if="themeConfig.sidebarOptions?.position === 'right'" i-ri-menu-4-fill @click="sakuraAppStore.sidebar.toggle" />
        <slot name="tool-ext" />
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
    background: var(--sakura-navbar-bg-color);

    &.has-scrolled {
      box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
    }
  }

  &-tools {
    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }

  .sakura-logo-link span:first-child {
    background-color: rgba(255, 255, 255, 0.5);
  }

  .sakura-nav-link-icon {
    height: 1em;
    width: 1em;
    margin-right: 0.2rem;
  }

  .sakura-navbar-link-item {
    a {
      font-size: 15px;
      color: var(--sakura-text-muted-color);
    }
  }

  // &:not(&.active-header) {
  //   .sakura-nav-link {
  //     display: none;
  //   }
  // }
}

// TODO:
.has-home-layout .sakura-navbar {
  &.active-header {
    box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
  }
}
</style>
