import type { ThemeConfig } from '../types'
import { startScrollDamping } from '../utils/scrollDamping'
import { useSakuraAppStore } from '../stores'
import { getLocalStorageItem, getSessionStorageItem } from '../utils/storage'
import { StorageKeys } from '../enum'

export function defineSakuraSetup(themeConfig: ThemeConfig) {
  const sakuraAppStore = useSakuraAppStore()

  if (themeConfig.scrollDamping)
    startScrollDamping()

  // SidebarOptions
  const sidebarOptions = themeConfig.sidebarOptions!
  if (sidebarOptions.persistence === 'permanent') {
    sakuraAppStore.sidebar.isOpen = getLocalStorageItem(StorageKeys.IS_SIDEBAR_OPEN) || sidebarOptions.initialState
  }
  else if (sidebarOptions.persistence === 'session') {
    sakuraAppStore.sidebar.isOpen = getSessionStorageItem(StorageKeys.IS_SIDEBAR_OPEN) || sidebarOptions.initialState
  }
  else {
    sakuraAppStore.sidebar.isOpen = sidebarOptions.initialState!
  }
}
