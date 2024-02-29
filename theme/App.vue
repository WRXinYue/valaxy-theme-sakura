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

<style lang="scss">
html {
  --global-font: "Noto Serif SC", "MicroSoft Yahei", serif;
  --code-line-height: 24px;
  --code-font-family: monospace;
  --code-font-size: 15px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: var(--st-c-accent);
}
</style>
