<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores/app'

const { invertScrolled } = withDefaults(defineProps<{
  favicon: boolean
  title: string | string[]
  invertScrolled: boolean
}>(), {
  invertScrolled: false,
})

const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()
const { y } = useScroll(window, { throttle: 80 })

const hoverNavbar = ref(false)

const scrolled = computed(() => y.value > 100)
const isHeaderHighlighted = computed(() => hoverNavbar.value || (invertScrolled ? scrolled.value : !scrolled.value))

watch(isHeaderHighlighted, () => sakura.isHeaderHighlighted = isHeaderHighlighted.value)

onMounted(() => {
  sakura.isHeaderHighlighted = hoverNavbar.value || (invertScrolled ? scrolled.value : !scrolled.value)
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
  position: fixed;
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

.active-header {
  background: var(--st-c-bg-nav);
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, .5);
}
</style>
