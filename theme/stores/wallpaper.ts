import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export function useWallpaper() {
  const wallpaperIndex = useStorage(`wallpaperKey-hero`, 0)
  const wallpaperLength = ref<number>(0)
  const wallpaperOperation = ref<'prevMedia' | 'nextMedia' | ''>()
  const wallpaperIsPlaying = ref(false)

  function prevWallpaper() {
    wallpaperOperation.value = 'prevMedia'
    wallpaperIndex.value = (wallpaperIndex.value - 1 + wallpaperLength.value) % wallpaperLength.value
    setTimeout(() => {
      wallpaperOperation.value = ''
    }, 0)
  }

  function nextWallpaper() {
    wallpaperOperation.value = 'nextMedia'
    wallpaperIndex.value = (wallpaperIndex.value + 1) % wallpaperLength.value
    setTimeout(() => {
      wallpaperOperation.value = ''
    }, 0)
  }

  function togglePlayPause() {
    wallpaperIsPlaying.value = !wallpaperIsPlaying.value
  }

  return { wallpaperIndex, wallpaperLength, wallpaperOperation, wallpaperIsPlaying, prevWallpaper, nextWallpaper, togglePlayPause }
}
