<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { isVideoUrl } from '../utils'
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage'
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

watch(() => sakura.wallpaperIndex[storageKey], (newIndex) => {
  setLocalStorageItem(storageKey, newIndex!)
  currentIndex.value = newIndex
})

watch(() => urls.value.length, async (length) => {
  sakura.wallpaperLength[storageKey] = length
})

onMounted(() => {
  currentIndex.value = getLocalStorageItem(storageKey, 0) || 0
  sakura.wallpaperIndex[storageKey] = currentIndex.value
  sakura.wallpaperLength[storageKey] = urls.value.length
})
</script>

<template>
  <div class="sakura-background-display w-full h-100vh">
    <template v-if="isCurrentMediaVideo">
      <video :key="currentWallpaperUrl" class="object-cover block bg-cover w-full h-full" preload="auto" autoplay loop muted>
        <source :src="currentWallpaperUrl" type="video/mp4">
        Your browser does not support video tags
      </video>
    </template>
    <template v-else>
      <img v-if="currentWallpaperUrl" alt="Image Wallpaper" class="w-full h-full object-cover block bg-cover bg-center" :src="currentWallpaperUrl">
      <div v-else class="default-wallpaper w-full h-full" />
    </template>
  </div>
</template>
