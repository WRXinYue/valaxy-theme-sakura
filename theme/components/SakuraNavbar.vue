<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useThemeConfig } from '../composables'
import type { NavItem } from '../types/index'

const props = defineProps({
  favicon: Boolean,
  title: [String, Array],
  hamburger: Boolean,
  navbar: Array<NavItem>,
})

const themeConfig = useThemeConfig()

const scrolled = ref(false)
const hoverHeaderActive = ref(false)
/** Special handling of certain links */
const processedNavItems = computed(() => (props.navbar || themeConfig.value.navbar)!.map(item => ({
  ...item,
  isExternal: item.link === '/atom.xml',
})))

const isHeaderActive = computed(() => {
  return hoverHeaderActive.value || scrolled.value
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  const scrollTop = window.scrollY
  scrolled.value = scrollTop > 100
}
</script>

<template>
  <header class="navbar z-5" :class="isHeaderActive ? 'active-header' : ''" @mouseover="hoverHeaderActive = true" @mouseleave="hoverHeaderActive = false">
    <slot name="nav-brand">
      <SakuraNavbarBrand :hamburger="hamburger" :favicon="favicon" :navbar-title="title || themeConfig.navbarTitle" />
    </slot>

    <slot name="nav-link">
      <div :class="isHeaderActive ? 'element-slide-left-fade-in <md:hidden' : 'md:relative hidden'" class="text-sm text-gray-500 leading-5 h-full w-auto">
        <template v-for="(item, i) in processedNavItems" :key="i">
          <div class="app-link-after relative h-full w-auto items-center inline-flex justify-center hover:after:w-full right-20">
            <SakuraNavLink :link="item.link" :icon="item.icon" :text="item.text" :is-external="item.isExternal" :submenu="item.submenu" />
          </div>
          <span v-if="i !== (navbar?.length || themeConfig.navbar.length) - 1" class="mr-3 ml-3" />
        </template>
      </div>
    </slot>

    <slot name="nav-tool">
      <SakuraToggleTheme />
    </slot>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  height: var(--st-c-navbar-height);
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.active-header {
  background: var(--st-c-bg-nav);
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, .5);
}

.app-link-after::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 6px;
  background-color: var(--st-c-secondary);
  transition: width 0.3s ease;
}
</style>
