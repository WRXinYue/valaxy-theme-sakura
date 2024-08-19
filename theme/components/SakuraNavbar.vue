<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const props = withDefaults(defineProps<{
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

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()

const hoverNavbar = ref(false)
const scrolled = ref(false)

const title = computed(() => props.title ?? themeConfig.value.navbarTitle)
const invert = computed(() => themeConfig.value.navbarOptions?.invert ?? props.invert)
const col = computed(() => themeConfig.value.navbarOptions?.col ?? props.col)
const autoHide = computed(() => themeConfig.value.navbarOptions?.autoHide ?? props.autoHide)
const animIn = computed(() => themeConfig.value.navbarOptions?.animIn ?? props.animIn)
const animOut = computed(() => themeConfig.value.navbarOptions?.animOut ?? props.animOut)
const isHeaderHighlighted = computed(() => {
  if (!autoHide.value)
    return true
  return hoverNavbar.value || (invert.value ? scrolled.value : !scrolled.value)
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
      <SakuraNavLink :class="autoHide && (isHeaderHighlighted ? animIn : animOut)" :col />
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
