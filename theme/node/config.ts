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

  articleList: {
    icon: 'i-fa6-solid:water',
    text: '文章列表',
  },

  articlePinned: {
    icon: 'i-fa6-solid:anchor',
    text: 'START:DASH!!',
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

  pagination: {
    animation: true,
    infiniteScrollOptions: {
      preload: true,
    },
  },

  scrollDamping: false,
  scrollAnimation: true,
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
  const { navbar, sidebar, footer, translateIcon, toggleThemeIcon, articlePinned, articleList } = themeConfig
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

  if (articleList?.icon)
    safelist.push(articleList.icon)

  if (articlePinned?.icon)
    safelist.push(articlePinned?.icon)

  return safelist
}
