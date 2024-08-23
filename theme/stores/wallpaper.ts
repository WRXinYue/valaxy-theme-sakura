import { ref } from 'vue'

export function useWallpaper() {
  const wallpaperIndex = ref<{ [key: string]: number }>({})
  const wallpaperLength = ref<{ [key: string]: number }>({})
  const wallpaperOperation = ref<'prevMedia' | 'nextMedia' | ''>()
  const isPlaying = ref(false)

  return { wallpaperIndex, wallpaperLength, wallpaperOperation, isPlaying }
}
