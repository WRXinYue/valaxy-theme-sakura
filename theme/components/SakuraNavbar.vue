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
  <header flex="~" w="full" fixed top-0 z-100 class="sakura-navbar" @mouseover="hoverNavbar = true" @mouseleave="hoverNavbar = false">
    <div class="sakura-safe-padding navbar-content" flex="~ items-center justify-between" w="full" :class="{ 'active-header': isHeaderHighlighted, 'has-scrolled': isScrolled, 'no-animation': noAnimation }">
      <slot name="brand">
        <div flex="~ items-center">
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
    </div>
  </header>
</template>

<style lang="scss">
.sakura-navbar {
  .navbar-content {
    height: var(--sakura-navbar-height);
    transition: all var(--va-transition-duration) ease;

    &.active-header {
      background: var(--sakura-navbar-bg);

      &.has-scrolled {
        box-shadow: 0 1px 40px -8px oklch(0% 0 0 / 50%);
      }
    }
  }

  &-tools {
    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }

  // .sakura-logo-link span:first-child {
  //   background-color: oklch(100% 0 0 / 50%);
  // }

  .sakura-nav-link-icon {
    height: 1em;
    width: 1em;
    margin-right: 0.2rem;
  }

  // &:not(&.active-header) {
  //   .sakura-nav-link {
  //     display: none;
  //   }
  // }

  .sakura-navbar-tools {
    color: var(--sakura-navbar-item-color);
  }
}

// TODO: optimize
.has-home-layout .sakura-navbar {
  &.active-header {
    box-shadow: 0 1px 40px -8px oklch(0% 0 0 / 50%);
  }
}
</style>
