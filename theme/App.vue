<script lang="ts" setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useThemeConfig } from './composables'
import { useSakura } from './setup/themeStart'

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
  <div />
</template>
