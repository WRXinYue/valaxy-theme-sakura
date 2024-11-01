import { ref } from 'vue'

export function useSearch() {
  const isOpen = ref(false)

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { search: { isOpen, toggle, open, close } }
}
