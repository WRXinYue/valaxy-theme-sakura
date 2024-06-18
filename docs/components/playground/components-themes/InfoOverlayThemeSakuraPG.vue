<script setup lang="ts">
import { useThemeConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-sakura'

defineProps<{
  demo: number
}>()

const themeConfig = useThemeConfig() as unknown as ThemeConfig
</script>

<template>
  <InfoOverlayThemeSakura v-if="demo === 1" />

  <InfoOverlayThemeSakura v-else-if="demo === 2">
    <template #highlighted-text>
      <SakuraGlitchText text="Hello, Valaxy" />
    </template>
    <template #muted-text>
      <span class="inline-block color-amber" i-fa6-solid-bolt />
      Welcome to Valaxy 🌌
      <span class="inline-block color-amber" i-fa6-solid-bolt />
    </template>
  </InfoOverlayThemeSakura>

  <InfoOverlayThemeSakura v-else-if="demo === 3">
    <template #highlighted-text>
      <SakuraGlitchText :type-string="themeConfig.banner.title" :delete-all="200" loop :pause-for="3000" />
    </template>
    <template #muted-text>
      <span class="inline-block" i-fa6-solid-quote-left />
      <SakuraTypewriter :type-string="themeConfig.banner.motto" :delete-all="20" loop :pause-for="3000" />
      <span class="inline-block" i-fa6-solid-quote-right />
    </template>
  </InfoOverlayThemeSakura>
</template>
