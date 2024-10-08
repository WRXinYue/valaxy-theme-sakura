<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useAppStore } from 'valaxy'

const appStore = useAppStore()

useHead({
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
