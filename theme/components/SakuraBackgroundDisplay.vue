<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { isVideoUrl } from '../utils'
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage'
import { useSakuraAppStore } from '../stores'
import { useThemeConfig } from '../composables'
import playIconUrl from '../assets/icon/play@32x32.png'
import pauseIconUrl from '../assets/icon/pause@32x32.png'

const props = withDefaults(defineProps<{
  urls?: string[] | string
  wallpaperKey?: string
}>(), {
  wallpaperKey: 'banner',
})

const storageKey = `wallpaperKey-${props.wallpaperKey}`
const currentIndex = ref<number>(0)

const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()

const urls = computed(() => props.urls || themeConfig.value.banner.urls || '')
const currentWallpaperUrl = computed(() => typeof urls.value === 'string' ? urls.value : urls.value[currentIndex.value])
const isCurrentMediaVideo = computed(() => isVideoUrl(currentWallpaperUrl.value))
const currentIconUrl = computed(() => sakura.isPlaying ? pauseIconUrl : playIconUrl)
const banner = computed(() => themeConfig.value.banner)

watch(() => sakura.wallpaperIndex[storageKey], (newIndex) => {
  setLocalStorageItem(storageKey, newIndex!)
  currentIndex.value = newIndex
})

watch(() => urls.value.length, async (length) => {
  sakura.wallpaperLength[storageKey] = length
})

function togglePlayPause() {
  sakura.isPlaying = !sakura.isPlaying
}

onMounted(() => {
  currentIndex.value = getLocalStorageItem(storageKey) || 0
  sakura.wallpaperIndex[storageKey] = currentIndex.value
  sakura.wallpaperLength[storageKey] = urls.value.length
})
</script>

<template>
  <div class="sakura-background-display h-100vh w-full overflow-hidden">
    <Transition
      :name="sakura.wallpaperOperation === 'nextMedia' ? 'slide-right'
        : sakura.wallpaperOperation === 'prevMedia' ? 'slide-left'
          : 'fade'"
      mode="out-in"
    >
      <template v-if="sakura.isPlaying || isCurrentMediaVideo">
        <video
          :key="sakura.isPlaying ? banner.playerUrl : currentWallpaperUrl"
          class="min-h-full min-w-full object-cover"
          preload="auto" autoplay :loop="!sakura.isPlaying" :muted="!sakura.isPlaying"
          :disablePictureInPicture="banner.disablePictureInPicture"
          @ended="sakura.isPlaying = false"
        >
          <source :src="sakura.isPlaying ? banner.playerUrl : currentWallpaperUrl" type="video/mp4">
          Your browser does not support video tags
        </video>
      </template>
      <template v-else>
        <img v-if="currentWallpaperUrl" :key="currentWallpaperUrl" alt="Image Wallpaper" class="block h-full w-full bg-cover bg-center object-cover" :src="currentWallpaperUrl">
        <div v-else class="default-wallpaper h-full w-full" />
      </template>
    </Transition>
  </div>
  <img :src="currentIconUrl" z-5 class="animation-fly absolute bottom-2 right-2 h-8 w-8 cursor-pointer" style="animation-duration: 2s; --translate-distance: 0.2em" @click="togglePlayPause">
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right {
  &-enter-active,
  &-leave-active {
    transition: transform 1s ease;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-100%);
  }

  &-enter-to,
  &-leave-from {
    transform: translateX(0);
  }
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 1s ease;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(100%);
}
</style>
