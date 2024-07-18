<script lang="ts" setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useSakuraAppStore } from './stores'
import { useThemeConfig } from './composables'
import { useSakura } from './setup/themeStart'

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()

onMounted(() => {
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

  useSakura(themeConfig.value)
})
</script>

<template>
  <SakuraNavbarCustom
    class="sakura-app-navbar"
    :style="sakuraAppStore.leftSidebar.isOpen ? (
      themeConfig.sidebarOptions?.position === 'left'
        ? '--sakura-private-sidebar-offset: var(--st-c-sidebar-offset)'
        : '--sakura-private-sidebar-offset: calc(var(--st-c-sidebar-offset) * -1)'
    ) : ''"
  />
  <SakuraSidebarCustom class="sakura-app-sidebar" />
</template>
