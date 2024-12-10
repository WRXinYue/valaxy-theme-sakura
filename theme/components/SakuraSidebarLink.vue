<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavItem } from '../types'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  sidebar?: NavItem[]
}>()

const themeConfig = useThemeConfig()
const route = useRoute()

const marker = ref()

const sidebar = computed(() =>
  props.sidebar
  || (Array.isArray(themeConfig.value.sidebar) && themeConfig.value.sidebar.length > 0 ? themeConfig.value.sidebar : themeConfig.value.navbar),
) as unknown as NavItem[]
watch(() => route.path, () => nextTick(() => updateMarker()))

function updateMarker() {
  const routeActive = document.querySelector('.sakura-sidebar-link .router-link-active') as HTMLElement
  // const sidebarTop = document.querySelector('.sakura-sidebar .site-link') as HTMLElement

  marker.value.style.top = `${routeActive?.offsetTop || 0}px`
  marker.value.style.height = `${routeActive?.offsetHeight || 0}px`
}

onMounted(() => {
  nextTick(() => updateMarker())
  marker.value = document.querySelector('.sakura-sidebar #marker')
})
</script>

<template>
  <nav class="sakura-sidebar-link">
    <SakuraSidebarLinkItem :items="sidebar" class="mx-auto" />
    <div id="marker" />
  </nav>
</template>

<style lang="scss" scoped>
.sakura-sidebar-link {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}
</style>
