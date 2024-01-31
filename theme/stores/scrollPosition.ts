import { defineStore } from 'pinia'

export const useScrollPositionStore = defineStore('scrollPosition', {
  state: () => ({
    positions: {} as Record<string, number>,
  }),
  actions: {
    setScrollPosition(id: string, position: number) {
      this.positions[id] = position
    },
    getScrollPosition(id: string): number {
      return this.positions[id] || 0
    },
  },
})
