import { ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSakuraAppStore = defineStore('sakura-app', () => {
  const positions = ref({})

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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSakuraAppStore, import.meta.hot))
