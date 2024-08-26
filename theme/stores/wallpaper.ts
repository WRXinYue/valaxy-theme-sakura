import { ref } from 'vue'

export function useWallpaper() {
  const wallpaperIndex = ref<{ [key: string]: number }>({})
  const wallpaperLength = ref<{ [key: string]: number }>({})
  const wallpaperOperation = ref<'prevMedia' | 'nextMedia' | ''>()
  const wallpaperIsPlaying = ref(false)

  function togglePlayPause() {
    wallpaperIsPlaying.value = !wallpaperIsPlaying.value
  }

  return { wallpaperIndex, wallpaperLength, wallpaperOperation, wallpaperIsPlaying, togglePlayPause }
}
