<script lang="ts" setup>
import { computed } from 'vue'
import { isVideoUrl } from '../utils'

const props = defineProps({
  url: String,
})

const isCurrentMediaVideo = computed(() => {
  return isVideoUrl(props.url!)
})
</script>

<template>
  <template v-if="isCurrentMediaVideo">
    <video class="object-cover block bg-cover w-full h-full" preload="auto" autoplay loop muted>
      <source :src="url" type="video/mp4">
      Your browser does not support video tags
    </video>
  </template>
  <template v-else>
    <img alt="Image Wallpaper" class="w-full h-100vh object-cover block bg-cover bg-center" :src="url">
  </template>
</template>
