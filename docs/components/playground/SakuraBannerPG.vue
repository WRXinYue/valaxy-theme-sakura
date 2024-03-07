<script lang="ts" setup>
import { ref } from 'vue'

const banner = ref({
  enable: true,
  title: 'My Banner',
  motto: 'This is my motto',
  urls: ['https://w.wallhaven.cc/full/m3/wallhaven-m3vg68.jpg', 'https://w.wallhaven.cc/full/2y/wallhaven-2yjp6x.png'],
  style: 'filter-dot',
  overlayBar: true,
})
</script>

<template>
  <SakuraBanner :banner="banner" />
</template>
