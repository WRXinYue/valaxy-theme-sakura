import { ref } from 'vue'

export function useWallpaper() {
  const wallpaperIndex = ref<{ [key: string]: number }>({})
  const wallpaperLength = ref<{ [key: string]: number }>({})

  return { wallpaperIndex, wallpaperLength }
}
