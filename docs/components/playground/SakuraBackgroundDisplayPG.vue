<script setup lang="ts">
import { ref } from 'vue'

const config = ref({
  banner: {
    urls: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-pkxlv3.jpg',
  },
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <SakuraBackgroundDisplay :urls="config.banner.urls" />
  <CodeEditor :config="config" @update:config="configUpdate" />
</template>
