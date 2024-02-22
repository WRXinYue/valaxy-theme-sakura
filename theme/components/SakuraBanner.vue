<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useSiteConfig } from 'valaxy'
import { useThemeConfig } from '../composables'
import { isVideoUrl } from '../utils'

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const storageKey = 'headerMediaIndex'
const currentIndex = ref()

onMounted(() => {
  currentIndex.value = Number.parseInt(localStorage.getItem(storageKey) || '0', 10)
})

const currentWallpaperUrl = computed(() => {
  return themeConfig.value.headerWallpaper.urls[currentIndex.value] || ''
})

const isCurrentMediaVideo = computed(() => {
  return isVideoUrl(currentWallpaperUrl.value)
})

function nextMedia() {
  if (currentIndex.value < themeConfig.value.headerWallpaper.urls.length - 1)
    currentIndex.value++
  else
    currentIndex.value = 0
}

function prevMedia() {
  if (currentIndex.value > 0)
    currentIndex.value--
  else
    currentIndex.value = themeConfig.value.headerWallpaper.urls.length - 1
}

watch(currentIndex, (newIndex) => {
  localStorage.setItem(storageKey, newIndex.toString())
})
</script>

<template>
  <header class="relative flex <md:px-5 justify-center flex-items-center w-full h-100vh">
    <div class="headertop absolute h-full w-full top-0 overflow-hidden" :class="themeConfig.headerWallpaper.backgroundStyle">
      <template v-if="isCurrentMediaVideo">
        <video class="object-cover block bg-cover w-full h-full" preload="auto" autoplay loop muted>
          <source :src="currentWallpaperUrl" type="video/mp4">
          您的浏览器不支持视频标签。
        </video>
      </template>
      <template v-else>
        <div class="w-full h-full object-cover block bg-cover" :style="`background-image: url(${currentWallpaperUrl})`" />
      </template>
      <div class="front-wave absolute z-12 bottom-0 w-[400%] h-65px" />
      <div class="foreground-wave absolute z-12 bottom-0 w-[400%] h-80px" />
    </div>
    <div class="info z-4">
      <GlitchText :text="themeConfig.homeTitle" />
      <div class="text-white w-full h-full rounded-2xl px-4 py-3" style="background-color: rgba(0, 0, 0, 0.5);">
        <div class="text-center text-lg flex items-center items-center w-full h-full">
          <div i-fa6-solid-quote-left text-base />
          <div class="px-2">
            {{ themeConfig.homeMotto }}
          </div>
          <div i-fa6-solid-quote-right text-base />
        </div>
        <div class="flex justify-between mx-5 mt-4">
          <img class="icon" cursor-pointer rotate-180 src="../assets/next-b.svg" @click="prevMedia">
          <a v-for="s in siteConfig.social" :key="s.name" class="icon" :href="s.link" aria-label="icon" target="_blank">
            <div :class="[s.icon]" />
          </a>
          <img class="icon" cursor-pointer src="../assets/next-b.svg" @click="nextMedia">
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.front-wave {
  background: url("../assets/wave1.png") repeat-x;
  animation: front-wave-animation 30s infinite linear;
}

.foreground-wave {
  background: url("../assets/wave2.png") repeat-x;
  animation: foreground-wave-animation 20s infinite linear;
}

.info {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  height: 22px;
  width: 22px;
}

@keyframes front-wave-animation {
  0% {
    left: 0;
  }

  100% {
    left: -997px;
  }
}

@keyframes foreground-wave-animation {
  0% {
    left: 0;
  }

  100% {
    left: -1009px;
  }
}

.headertop::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-attachment: fixed
}

.headertop.filter-dim::before {
  background-color: rgba(0, 0, 0, 0.3)
}

.headertop.filter-grid::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/grid.png)
}

.filter-dot.filter-dot::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/dot.gif);
}
</style>
