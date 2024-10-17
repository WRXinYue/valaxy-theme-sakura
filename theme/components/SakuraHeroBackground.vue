<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { isVideoUrl } from '../utils'
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage'
import { useSakuraAppStore } from '../stores'
import { useThemeConfig } from '../composables'

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
const banner = computed(() => themeConfig.value.banner)

watch(() => sakura.wallpaperIndex[storageKey], (newIndex) => {
  setLocalStorageItem(storageKey, newIndex!)
  currentIndex.value = newIndex
})

watch(() => urls.value.length, async (length) => {
  sakura.wallpaperLength[storageKey] = length
})

onMounted(() => {
  currentIndex.value = getLocalStorageItem(storageKey) || 0
  sakura.wallpaperIndex[storageKey] = currentIndex.value
  sakura.wallpaperLength[storageKey] = urls.value.length
})
</script>

<template>
  <div class="sakura-hero-background h-100vh w-full overflow-hidden">
    <Transition
      :name="sakura.wallpaperOperation === 'nextMedia' ? 'slide-right'
        : sakura.wallpaperOperation === 'prevMedia' ? 'slide-left'
          : 'fade'"
      mode="out-in"
    >
      <template v-if="sakura.wallpaperIsPlaying || isCurrentMediaVideo">
        <video
          :key="sakura.wallpaperIsPlaying ? banner.playerUrl : currentWallpaperUrl"
          class="min-h-full min-w-full object-cover"
          preload="auto" autoplay :loop="!sakura.wallpaperIsPlaying" :muted="!sakura.wallpaperIsPlaying"
          :disablePictureInPicture="banner.disablePictureInPicture"
          @ended="sakura.wallpaperIsPlaying = false"
        >
          <source :src="sakura.wallpaperIsPlaying ? banner.playerUrl : currentWallpaperUrl" type="video/mp4">
          Your browser does not support video tags
        </video>
      </template>
      <template v-else>
        <img v-if="currentWallpaperUrl" :key="currentWallpaperUrl" alt="Image Wallpaper" class="block h-full w-full bg-cover bg-center object-cover" :src="currentWallpaperUrl">
        <div v-else class="default-wallpaper h-full w-full" />
      </template>
    </Transition>
  </div>
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
