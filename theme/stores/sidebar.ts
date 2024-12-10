import { useFrontmatter } from 'valaxy'
import { computed, ref, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { StorageKeys } from '../enum'
// import { useFrontmatter, useMobile } from 'valaxy'
import { setLocalStorageItem, setSessionStorageItem } from '../utils/storage'

export function useSidebar() {
  const isOpen = ref(false)
  const fm = useFrontmatter()
  // const isMobile = useMobile()

  const hasSidebar = computed(() => fm.value.sidebar !== false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value ? close() : open()
  }

  const sidebarOptions = useThemeConfig().value.sidebarOptions

  // status monitoring
  if (sidebarOptions?.persistence === 'permanent')
    watch(isOpen, () => setLocalStorageItem(StorageKeys.IS_SIDEBAR_OPEN, isOpen.value))
  else if (sidebarOptions?.persistence === 'session')
    watch(isOpen, () => setSessionStorageItem(StorageKeys.IS_SIDEBAR_OPEN, isOpen.value))

  return { sidebar: { isOpen, hasSidebar, open, close, toggle } }
}
