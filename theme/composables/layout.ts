import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useLayout() {
  const route = useRoute()
  const layout = computed(() => route.meta?.layout as string)

  function isIncludes(value: boolean | string | string[]): boolean {
    if (typeof value === 'boolean')
      return value
    if (typeof value === 'string')
      return value === layout.value
    if (Array.isArray(value))
      return value.includes(layout.value)
    return false
  }

  return {
    layout,
    isIncludes,
  }
}
