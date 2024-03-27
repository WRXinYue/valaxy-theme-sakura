import { ref } from 'vue'
import type { Ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSakuraAppStore = defineStore('sakura-app', () => {
  const positions = ref<Record<string, number>>({})
  const paginationTargets: Ref<Element[]> = ref([])
  const paginationObserver = ref<IntersectionObserver>()
  const paginationElementPositionsNumber = ref(0)

  // Article Pagination
  const curPage = ref()
  const loadMultiple = ref(1)

  const wallpaperIndex = ref<{ [key: string]: number }>({})
  const wallpaperLength = ref<{ [key: string]: number }>({})

  const isHeaderHighlighted = ref(false)

  function setScrollPosition(id: string, position: number) {
    positions.value[id] = position
  }

  function getScrollPosition(id: string): number {
    return positions.value[id] || 0
  }

  return {
    positions,
    setScrollPosition,
    getScrollPosition,
    loadMultiple,
    paginationTargets,
    paginationObserver,
    paginationElementPositionsNumber,
    curPage,
    wallpaperIndex,
    wallpaperLength,
    isHeaderHighlighted,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSakuraAppStore, import.meta.hot))
