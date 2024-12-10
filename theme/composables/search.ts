import { useEventListener } from '@vueuse/core'
import { useSiteConfig } from 'valaxy'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { loadAlgolia } from '../plugins/algolia'
// import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
// import { useFuse } from '@vueuse/integrations/useFuse'
// import type { FuseListItem } from 'valaxy/types'
import { useSakuraAppStore } from '../stores'

export function useSearchHotKey(togglePopup: () => void) {
  function handleSearchHotKey(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      togglePopup()
    }
  }

  onMounted(() => {
    useEventListener('keydown', handleSearchHotKey)
  })
}

const searchInitialized = ref(false)

export function useSearch() {
  const sakuraApp = useSakuraAppStore()
  const siteConfig = useSiteConfig()
  const searchType = computed(() => siteConfig.value.search.type)

  const initializeSearch = (searchPopup = sakuraApp.search) => {
    const handlers: Record<string, () => void> = {
      fuse: () => useSearchHotKey(searchPopup.toggle),
      algolia: () => watchEffect(() => {
        if (searchPopup.isOpen)
          loadAlgolia()
      }),
    }

    const handler = handlers[searchType.value] || (() => {
      console.warn('Warning: Unsupported search type. Defaulting to Fuse search.')
      return handlers.fuse()
    })

    handler()
  }

  if (!searchInitialized.value) {
    initializeSearch()
    searchInitialized.value = true
  }

  return sakuraApp.search
}

// export function useFuseSearch() {
//   const siteConfig = useSiteConfig()

//   const inputRef = ref('')
//   const fuseListData = ref<FuseListItem[]>([])

//   const keys = computed(() => {
//     const ks = siteConfig.value.fuse.options.keys || []
//     return ks.length === 0 ? ['title', 'tags', 'categories', 'excerpt'] : ks
//   })
//   const useFuseOptions = computed<UseFuseOptions<FuseListItem>>(() => ({
//     fuseOptions: {
//       includeMatches: true,
//       findAllMatches: true,

//       ...siteConfig.value.fuse.options,
//       keys: keys.value,

//       // threshold: 0.99,
//       // ignoreLocation: true,
//     },
//     // resultLimit: resultLimit.value,
//     // matchAllWhenSearchEmpty: matchAllWhenSearchEmpty.value,
//   }))

//   const ruse = useFuse(inputRef, fuseListData, useFuseOptions)

//   async function fetchFuseListData(path?: string) {
//     const fuseListDataPath = path
//       || (siteConfig.value.fuse.dataPath.startsWith('http')
//         ? siteConfig.value.fuse.dataPath
//         : `${import.meta.env.BASE_URL}${siteConfig.value.fuse.dataPath}`)

//     const res = await fetch(fuseListDataPath)
//     const data = await res.json()

//     if (Array.isArray(data))
//       fuseListData.value = data
//   }

//   return {
//     inputRef,
//     ruse,
//     fetchFuseListData,
//   }
// }
