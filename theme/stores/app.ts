import { acceptHMRUpdate, defineStore } from 'pinia'
import { usePagination } from './pagination'
import { useScrollPosition } from './scrollPosition'
import { useSearch } from './search'
import { useSidebar } from './sidebar'
import { useWallpaper } from './wallpaper'

export const useSakuraAppStore = defineStore('sakura-app', () => {
  const scrollPosition = useScrollPosition()
  const pagination = usePagination()
  const wallpaper = useWallpaper()
  const sidebar = useSidebar()
  const search = useSearch()

  return {
    ...scrollPosition,
    ...pagination,
    ...wallpaper,
    ...sidebar,
    ...search,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSakuraAppStore, import.meta.hot))
