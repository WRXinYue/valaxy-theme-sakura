import { useScreenSize } from 'valaxy'
import type { ThemeConfig } from '../types'
import { StorageKeys } from '../enum'
import { initLenis } from '../plugins/lenis'
import { useSakuraAppStore } from '../stores'
import { getLocalStorageItem, getSessionStorageItem } from '../utils/storage'

export function defineSakuraSetup(themeConfig: ThemeConfig) {
  const sakuraAppStore = useSakuraAppStore()
  const { isMd } = useScreenSize()

  if (themeConfig.scrollDamping && !isMd)
    initLenis()

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

  themeConfig.theme?.extends?.forEach(({ name }) => {
    sakuraAppStore.themes.push(name)
  })

  sakuraAppStore.toggleTheme(themeConfig.theme?.default || sakuraAppStore.curTheme)
}
