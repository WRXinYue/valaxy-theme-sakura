import { acceptHMRUpdate, defineStore } from 'pinia'
import { useScrollPosition } from './scrollPosition'
import { usePagination } from './pagination'
import { useWallpaper } from './wallpaper'
import { useSidebar } from './sidebar'

export const useSakuraAppStore = defineStore('sakura-app', () => {
  const scrollPosition = useScrollPosition()
  const pagination = usePagination()
  const wallpaper = useWallpaper()
  const sidebar = useSidebar()

  return {
    ...scrollPosition,
    ...pagination,
    ...wallpaper,
    ...sidebar,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSakuraAppStore, import.meta.hot))
