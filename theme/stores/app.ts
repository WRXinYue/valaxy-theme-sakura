import { acceptHMRUpdate, defineStore } from 'pinia'
import { useTheme } from './theme'
import { useScrollPosition } from './scrollPosition'
import { usePagination } from './pagination'
import { useWallpaper } from './wallpaper'
import { useSidebar } from './sidebar'
import { useSearch } from './search'

export const useSakuraAppStore = defineStore('sakura-app', () => {
  const theme = useTheme()
  const scrollPosition = useScrollPosition()
  const pagination = usePagination()
  const wallpaper = useWallpaper()
  const sidebar = useSidebar()
  const search = useSearch()

  return {
    ...theme,
    ...scrollPosition,
    ...pagination,
    ...wallpaper,
    ...sidebar,
    ...search,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSakuraAppStore, import.meta.hot))
