import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useLayout() {
  const route = useRoute()
  const layout = computed(() => route.meta?.layout as string)

  return { layout }
}
