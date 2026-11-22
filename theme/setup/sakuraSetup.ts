import type { ThemeConfig } from '../types'
import { isEmptyAddon, useScreenSize } from 'valaxy'
import * as addonBangumi from 'valaxy-addon-bangumi'
import { StorageKeys } from '../core/enum'
import { getLocalStorageItem, getSessionStorageItem } from '../core/utils/storage'
import { applySakuraBangumiStyles } from '../plugins/bangumi'
import { initLenis } from '../plugins/lenis'
import { useSakuraAppStore } from '../stores'

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

  if (!isEmptyAddon(addonBangumi))
    applySakuraBangumiStyles()
}
