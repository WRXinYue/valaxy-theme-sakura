import { ref } from 'vue'
import type { Ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSakuraAppStore = defineStore('sakura-app', () => {
  const positions = ref<Record<string, number>>({})
  const loadMultiple = ref(1)
  const paginationTargets: Ref<Element[]> = ref([])
  const paginationObserver = ref<IntersectionObserver>()
  const paginationElementPositionsNumber = ref(0)

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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSakuraAppStore, import.meta.hot))
