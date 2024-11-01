import type { Ref } from 'vue'
import { ref } from 'vue'

export function usePagination() {
  // Post Pagination
  const curPage = ref()
  const loadMultiple = ref(1)

  const paginationTargets: Ref<Element[]> = ref([])
  const paginationObserver = ref<IntersectionObserver>()
  const paginationElementPositionsNumber = ref(0)
  return { curPage, loadMultiple, paginationTargets, paginationObserver, paginationElementPositionsNumber }
}
