<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useAppStore } from 'valaxy'

const appStore = useAppStore()

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

  meta: [
    {
      name: 'theme-color',
      content: appStore.themeColor,
    },
    {
      name: 'msapplication-TileColor',
      content: appStore.themeColor,
    },
  ],
})
</script>

<template>
  <SakuraSidebarCustom class="sakura-app-sidebar" />
  <Layout>
    <RouterView />
  </Layout>
</template>
