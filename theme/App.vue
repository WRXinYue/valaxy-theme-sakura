<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useSakuraAppStore } from './stores'
import { useThemeConfig } from './composables'

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://cdn.jsdelivr.net',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.7.6/fonts/Moe-Mashiro/stylesheet.css',
    },
  ],
})
</script>

<template>
  <SakuraNavbarCustom
    class="sakura-app-navbar"
    :style="sakuraAppStore.sidebar.isOpen ? (
      themeConfig.sidebarOptions?.position === 'left'
        ? '--sakura-private-sidebar-offset: var(--st-c-sidebar-offset)'
        : '--sakura-private-sidebar-offset: calc(var(--st-c-sidebar-offset) * -1)'
    ) : ''"
  />
  <SakuraSidebarCustom class="sakura-app-sidebar" />
</template>
