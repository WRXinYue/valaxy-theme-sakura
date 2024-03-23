<script lang="ts" setup>
import { ref } from 'vue'

const config = ref({
  banner: {
    title: 'My Banner',
    motto: 'This is my motto',
    urls: [
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-j8epp5.png',
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-wewdy7.jpg',
    ],
    style: 'filter-dot',
  },
} as any)

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <SakuraBanner :banner="config.banner" />

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>
