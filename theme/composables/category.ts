import { useStorage } from '@vueuse/core'

const expandedCategories = useStorage<string[]>('sakura-expanded-categories', [])

export function useCategoryState() {
  const toggleCategory = (key: string) => {
    if (expandedCategories.value.includes(key)) {
      expandedCategories.value = expandedCategories.value.filter(k => k !== key)
    }
    else {
      expandedCategories.value.push(key)
    }
  }

  const isExpanded = (key: string) => {
    return expandedCategories.value.includes(key)
  }

  const setExpanded = (key: string, expanded: boolean) => {
    if (expanded) {
      if (!expandedCategories.value.includes(key))
        expandedCategories.value.push(key)
    }
    else {
      expandedCategories.value = expandedCategories.value.filter(k => k !== key)
    }
  }

  const expandAll = (keys: string[]) => {
    // Merge existing keys with new keys, removing duplicates
    const newSet = new Set([...expandedCategories.value, ...keys])
    expandedCategories.value = Array.from(newSet)
  }

  const collapseAll = () => {
    expandedCategories.value = []
  }

  return {
    expandedCategories,
    toggleCategory,
    isExpanded,
    setExpanded,
    expandAll,
    collapseAll,
  }
}
