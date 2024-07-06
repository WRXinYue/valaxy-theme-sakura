<script lang="ts" setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useAppStore } from 'valaxy'
import { useThemeConfig } from './composables'
import { useSakura } from './setup/themeStart'

const app = useAppStore()
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
  <SakuraNavbarCustom class="sakura-app-navbar" :style="app.isSidebarOpen ? '--_sakura-sidebar-offset: var(--st-c-sidebar-offset)' : ''" />
  <SakuraSidebarCustom class="sakura-app-sidebar" />
</template>
