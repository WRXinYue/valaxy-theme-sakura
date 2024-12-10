import { isClient } from '@vueuse/core'
import { ref, watch } from 'vue'

export function fetchData<T>(source: string | T[]) {
  const data = ref<T[]>()

  watch(() => source, () => {
    let rawData: T[]
    if (typeof source === 'string') {
      if (!isClient)
        return
      fetch(source)
        .then(res => res.json())
        .then((json: T[]) => {
          rawData = json || []
          data.value = rawData
        })
        .catch(() => {
          data.value = []
        })
    }
    else {
      rawData = source
      data.value = rawData
    }
  }, { immediate: true })

  return {
    data,
  }
}
