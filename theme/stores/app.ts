import { ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSakuraAppStore = defineStore('sakura-app', () => {
  const positions = ref<Record<string, number>>({})
  const loadMultiple = ref(1)

  function setScrollPosition(id: string, position: number) {
    positions.value[id] = position
  }

  function getScrollPosition(id: string): number {
    return positions.value[id] || 0
  }

  function handLoadMore() {
    loadMultiple.value++
  }

  return {
    positions,
    setScrollPosition,
    getScrollPosition,
    loadMultiple,
    handLoadMore,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSakuraAppStore, import.meta.hot))
