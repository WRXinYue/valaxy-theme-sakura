import { ref } from 'vue'

export const algoliaRef = ref()

export function loadAlgolia() {
  algoliaRef.value?.load()
  algoliaRef.value?.dispatchEvent(new Event('load'))
}
