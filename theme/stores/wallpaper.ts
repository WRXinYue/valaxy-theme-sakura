import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

export function useWallpaper() {
  const wallpaperIndex = useStorage(`wallpaperKey-hero`, 0)
  const wallpaperLength = ref<number>(0)
  const wallpaperOperation = ref<'prevMedia' | 'nextMedia' | ''>()
  const wallpaperIsPlaying = ref(false)
  const wallpaperSoundEnabled = ref(false)
  const wallpaperDisplayIndex = ref(0)
  const wallpaperManual = ref(false)

  function selectWallpaper(index: number) {
    if (index < 0)
      return
    wallpaperOperation.value = index >= wallpaperIndex.value
      ? 'nextMedia'
      : 'prevMedia'
    wallpaperIndex.value = index
    wallpaperManual.value = true
    setTimeout(() => {
      wallpaperOperation.value = ''
    }, 0)
  }

  function prevWallpaper() {
    if (wallpaperLength.value <= 0)
      return
    wallpaperOperation.value = 'prevMedia'
    wallpaperIndex.value = (wallpaperIndex.value - 1 + wallpaperLength.value) % wallpaperLength.value
    setTimeout(() => {
      wallpaperOperation.value = ''
    }, 0)
  }

  function nextWallpaper() {
    if (wallpaperLength.value <= 0)
      return
    wallpaperOperation.value = 'nextMedia'
    wallpaperIndex.value = (wallpaperIndex.value + 1) % wallpaperLength.value
    setTimeout(() => {
      wallpaperOperation.value = ''
    }, 0)
  }

  function togglePlayPause() {
    wallpaperIsPlaying.value = !wallpaperIsPlaying.value
    wallpaperSoundEnabled.value = wallpaperIsPlaying.value
  }

  function toggleSound() {
    wallpaperSoundEnabled.value = !wallpaperSoundEnabled.value
  }

  return {
    wallpaperIndex,
    wallpaperLength,
    wallpaperOperation,
    wallpaperIsPlaying,
    wallpaperSoundEnabled,
    wallpaperDisplayIndex,
    wallpaperManual,
    selectWallpaper,
    prevWallpaper,
    nextWallpaper,
    togglePlayPause,
    toggleSound,
  }
}
