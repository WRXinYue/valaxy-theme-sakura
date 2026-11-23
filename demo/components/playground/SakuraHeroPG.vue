<script lang="ts" setup>
import { ref } from 'vue'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

const config = ref<ThemeUserConfig>({
  hero: {
    title: 'My Banner',
    motto: 'This is my motto',
    urls: [
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-j8epp5.png',
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-wewdy7.jpg',
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-pkxlv3.jpg',
    ],
    style: 'dot',
    waveTheme: 'horizontal',
  },
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <FullScreenWrapper>
    <SakuraHero :hero="config.hero" />
  </FullScreenWrapper>

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>

<style lang="scss">
.full-screen-wrapper {
  &:not(.is-fullscreen) {
    .sakura-hero {
      height: 60vh !important;
    }
  }
}
</style>
