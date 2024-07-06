<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavItem } from '../types/index'
import { useThemeConfig } from '../composables'

const { navbar, col } = withDefaults(defineProps<{
  navbar?: NavItem[]
  col?: boolean
}>(), {
  col: false,
})

const themeConfig = useThemeConfig()
const route = useRoute()

const marker = ref()

const navLinkItems = computed(() => (navbar || themeConfig.value.navbar))

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
    marker.value = document.querySelector('.sakura-nav-lick #marker')
    updateMarker()
  })
})
</script>

<template>
  <nav class="sakura-nav-lick">
    <template v-for="(item, i) in navLinkItems" :key="i">
      <SakuraNavLinkItem :link="item.link" :icon="item.icon" :text="item.text" :submenu="item.submenu" />
      <span v-if="i !== (navbar?.length || themeConfig.navbar.length) - 1" class="mr-3 ml-3" />
    </template>

    <div id="marker" />
  </nav>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-nav-lick {
  display: none;
  height: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107 114 128 / var(--un-text-opacity));
  line-height: 1.25rem;
  transform: translateX(0);

  #marker {
    position: absolute;
    border-bottom: var(--st-c-sidebar-marker-h) solid var(--st-c-secondary);
    transition-property: opacity, left, top;
    transition-duration: 0.5s;
    pointer-events: none;
    filter: drop-shadow(0 5px 25px #08f9ff);
    height: 100%;
  }

  @include screen('md') {
    display: flex;
  }
}

.sakura-nav-link:hover {
  background-color: var(--st-c-secondary);
  border: #08f9ff;
  transition: width 0.3s ease;
  height: 100%;
  width: 100%;
}
</style>
