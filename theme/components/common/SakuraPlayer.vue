<script setup lang="ts">
import { computed } from 'vue'
import { useSakuraAppStore } from '../../stores'
import playIconUrl from '../../assets/icon/play@32x32.png'
import pauseIconUrl from '../../assets/icon/pause@32x32.png'

const { wallpaperIsPlaying } = useSakuraAppStore()

const currentIconUrl = computed(() => wallpaperIsPlaying ? pauseIconUrl : playIconUrl)
</script>

<template>
  <img
    :src="currentIconUrl" z-5 class="sakura-player animation-fly cursor-pointer"
    style="animation-duration: 2s; --translate-distance: 0.2em"
  >
</template>

<style lang="scss">
.sakura-player {
  z-index: 4;
}
</style>
