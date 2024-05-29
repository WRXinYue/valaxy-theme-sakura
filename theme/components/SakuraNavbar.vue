<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores/app'

const { invert } = withDefaults(defineProps<{
  favicon?: boolean
  title?: string | string[]
  invert?: boolean
}>(), {
  invert: false,
})

const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()

const hoverNavbar = ref(false)
const scrolled = ref(false)

const isHeaderHighlighted = computed(() => hoverNavbar.value || (invert ? scrolled.value : !scrolled.value))

watch(isHeaderHighlighted, () => sakura.isHeaderHighlighted = isHeaderHighlighted.value)

function handleScroll() {
  scrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  /**
   * If 'invert' is true, set 'isHeaderHighlighted' to null to prevent animation flicker
   * If 'invert' is false, initialize 'isHeaderHighlighted' normally based on navbar hover state or scroll state
   */
  if (invert)
    sakura.isHeaderHighlighted = null
  else
    sakura.isHeaderHighlighted = hoverNavbar.value || (invert ? scrolled.value : !scrolled.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="sakura-navbar" :class="isHeaderHighlighted ? 'active-header' : ''" @mouseover="hoverNavbar = true" @mouseleave="hoverNavbar = false">
    <slot name="nav-brand">
      <SakuraNavbarBrand :favicon="favicon" :navbar-title="title || themeConfig.navbarTitle" />
    </slot>

    <slot name="nav-link">
      <SakuraNavLink class="<md:hidden" />
    </slot>

    <slot name="nav-tool">
      <SakuraToggleTheme />
    </slot>
  </header>
</template>

<style lang="scss">
.sakura-navbar {
  position: sticky;
  z-index: 5;
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
</style>
