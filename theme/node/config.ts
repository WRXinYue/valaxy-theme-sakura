import type { ThemeConfig } from '../types'

export const defaultThemeConfig: ThemeConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  colors: {
    primary: '#0078E7',
  },

  navbarTitle: '',

  favicon: false,

  banner: {
    title: 'Hello, sakura',
    motto: 'You got to put the past behind you before you can move on.',
    urls: [],
    style: '',

    typewriter: false,
    enableHitokoto: false,

    disablePictureInPicture: false,
  },

  navbar: [],
  navbarOptions: {
    title: '',
    showMarker: true,
    activeHeader: {
      enableHover: true,
    },
  },

  sidebar: [],
  sidebarOptions: {
    position: 'left',
    offset: true,
    initialState: false,
    persistence: 'session',
    enableOnDesktop: false,
    showCounts: false,
  },

  footer: {
    since: 2024,
    icon: {
      animated: true,
      url: 'https://sponsors.yunyoujun.cn',
      title: 'WRXinYue',
    },

    powered: true,
  },

  tags: {
    rainbow: false,
  },

  scrollDamping: false,
  scrollToTop: false,

  translateIcon: 'i-ri-translate',
  toggleThemeIcon: {
    darkIcon: 'i-ri-moon-line',
    lightIcon: 'i-ri-sun-line',
  },
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const { navbar, sidebar, footer, translateIcon, toggleThemeIcon } = themeConfig
  const footerIcon = footer?.icon?.img

  const safelist: string[] = []

  if (footerIcon)
    safelist.push(footerIcon)

  navbar?.forEach((navItem) => {
    if (navItem.icon)
      safelist.push(navItem.icon)
  })

  sidebar?.forEach((sidebarItem) => {
    if (typeof sidebarItem !== 'string' && sidebarItem.icon)
      safelist.push(sidebarItem.icon)
  })

  if (translateIcon)
    safelist.push(translateIcon)

  if (toggleThemeIcon?.darkIcon)
    safelist.push(toggleThemeIcon.darkIcon)
  if (toggleThemeIcon?.lightIcon)
    safelist.push(toggleThemeIcon.lightIcon)

  return safelist
}
