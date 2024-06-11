<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavItem } from '../types/index'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores/app'

const { navbar, animIn, animOut, col } = withDefaults(defineProps<{
  navbar?: NavItem[]
  animIn?: string | string[]
  animOut?: string | string[]
  col?: boolean
}>(), {
  animIn: 'element-slide-left-fade-in',
  animOut: 'element-slide-left-fade-out',
  col: false,
})

const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()
const route = useRoute()

const marker = ref()

const navLinkItems = computed(() => (navbar || themeConfig.value.navbar))
const navAnime = computed(() => {
  /**
   * If 'isHeaderHighlighted' is null, return 'hidden' to prevent flickering during the 'animOut' animation
   * Otherwise, determine the animation state based on the value of 'isHeaderHighlighted'
   */
  if (sakura.isHeaderHighlighted === null)
    return 'hidden'

  return sakura.isHeaderHighlighted ? animIn : animOut
})

watch(() => route.path, () => {
  nextTick(updateMarker)
})

function updateMarker() {
  const routeActive = document.querySelector('.sakura-nav-lick .router-link-active') as HTMLElement
  if (!routeActive)
    return

  if (col) {
    marker.value.style.top = `${routeActive.offsetTop}px`
    marker.value.style.height = `${routeActive.offsetHeight}px`
  }
  else {
    marker.value.style.left = `${routeActive.offsetLeft}px`
    marker.value.style.width = `${routeActive.offsetWidth}px`
  }
}

onMounted(() => {
  nextTick(() => {
    marker.value = document.querySelector('#marker')
    updateMarker()
  })
})
</script>

<template>
  <nav :class="navAnime" class="sakura-nav-lick">
    <template v-for="(item, i) in navLinkItems" :key="i">
      <SakuraNavLinkItem :link="item.link" :icon="item.icon" :text="item.text" :submenu="item.submenu" />
      <span v-if="i !== (navbar?.length || themeConfig.navbar.length) - 1" class="mr-3 ml-3" />
    </template>

    <div id="marker" />
  </nav>
</template>

<style lang="scss">
#marker {
  position: absolute;
  border-bottom: var(--st-c-sidebar-marker-h) solid var(--st-c-secondary);
  transition-property: opacity, left, top;
  transition-duration: 0.5s;
  pointer-events: none;
  filter: drop-shadow(0 5px 25px #08f9ff);
  height: 100%;
}

.sakura-nav-lick {
  display: flex;
  height: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107 114 128 / var(--un-text-opacity));
  line-height: 1.25rem;
}

.sakura-nav-link:hover {
  background-color: var(--st-c-secondary);
  border: #08f9ff;
  transition: width 0.3s ease;
  height: 100%;
  width: 100%;
}
</style>
