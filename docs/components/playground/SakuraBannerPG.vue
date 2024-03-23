<script lang="ts" setup>
import { ref } from 'vue'
import type { Banner } from 'valaxy-theme-sakura/types'

const banner = ref<Banner>({
  enable: true,
  title: 'My Banner',
  motto: 'This is my motto',
  urls: [
    'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-j8epp5.png',
    'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-wewdy7.jpg',
  ],
  style: 'filter-dot',
})

function configUpdate(newConfig: Banner) {
  banner.value = newConfig
}
</script>

<template>
  <SakuraBanner :banner />

  <CodeEditor :config="banner" @update:config="configUpdate" />
</template>
