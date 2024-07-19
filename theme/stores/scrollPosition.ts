import { ref } from 'vue'

export function useScrollPosition() {
  const positions = ref<Record<string, number>>({})

  function setScrollPosition(id: string, position: number) {
    positions.value[id] = position
  }

  function getScrollPosition(id: string): number {
    return positions.value[id] || 0
  }

  return { positions, setScrollPosition, getScrollPosition }
}
