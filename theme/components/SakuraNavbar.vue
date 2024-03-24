<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import type { NavItem } from '../types/index'

const props = defineProps({
  favicon: Boolean,
  title: [String, Array],
  navbar: Array<NavItem>,
})

const themeConfig = useThemeConfig()
const route = useRoute()

const marker = ref()

const scrolled = ref(false)
const hoverHeaderActive = ref(false)
/** Special handling of certain links */
const processedNavItems = computed(() => (props.navbar || themeConfig.value.navbar)!.map(item => ({
  ...item,
  isExternal: item.link === '/atom.xml',
})))

const isHeaderHighlighted = computed(() => {
  return hoverHeaderActive.value || !scrolled.value
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  nextTick(() => {
    marker.value = document.querySelector('#marker')
    updateMarker()
  })
})

watch(
  () => route.path,
  () => {
    nextTick(updateMarker)
  },
)

function updateMarker() {
  const routeActive = document.querySelector('.sakura-nav .router-link-active') as any
  if (routeActive) {
    marker.value.style.left = `${routeActive.offsetLeft}px`
    marker.value.style.width = `${routeActive.offsetWidth}px`
  }
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  const scrollTop = window.scrollY
  scrolled.value = scrollTop > 100
}
</script>

<template>
  <header class="sakura-navbar z-5" :class="isHeaderHighlighted ? 'active-header' : ''" @mouseover="hoverHeaderActive = true" @mouseleave="hoverHeaderActive = false">
    <slot name="nav-brand">
      <SakuraNavbarBrand :favicon="favicon" :navbar-title="title || themeConfig.navbarTitle" />
    </slot>

    <slot name="nav-link">
      <!-- <nav :class="isHeaderHighlighted ? 'element-slide-left-fade-in' : 'element-slide-left-fade-out'" class="sakura-nav <md:hidden"> -->
      <nav :class="isHeaderHighlighted ? 'element-slide-left-fade-in' : 'element-slide-left-fade-out'" class="sakura-nav <md:hidden">
        <template v-for="(item, i) in processedNavItems" :key="i">
          <SakuraNavLink :link="item.link" :icon="item.icon" :text="item.text" :is-external="item.isExternal" :submenu="item.submenu" />
          <span v-if="i !== (navbar?.length || themeConfig.navbar.length) - 1" class="mr-3 ml-3" />
        </template>

        <div id="marker" />
      </nav>
    </slot>

    <slot name="nav-tool">
      <SakuraToggleTheme />
    </slot>
  </header>
</template>

<style lang="scss">
#marker {
  position: absolute;
  border-bottom: var(--st-c-sidebar-marker-h) solid var(--st-c-secondary);
  transition: 0.5s;
  pointer-events: none;
  filter: drop-shadow(0 5px 25px #08f9ff);
  height: 100%;
}

.sakura-navbar {
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

.sakura-nav {
  display: flex;
  height: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107 114 128 / var(--un-text-opacity));
  line-height: 1.25rem;
}

.active-header {
  background: var(--st-c-bg-nav);
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, .5);
}

.sakura-nav-link:hover {
  background-color: var(--st-c-secondary);
  border: #08f9ff;
  transition: width 0.3s ease;
  height: 100%;
  width: 100%;
}
</style>
