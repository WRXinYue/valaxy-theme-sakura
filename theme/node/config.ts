import type { ThemeConfig, ThemeUserConfig } from '../types'

export const defaultThemeConfig: ThemeUserConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  ui: {
    primary: '#fe9500',

    notice: {
      icon: 'i-fa6-solid:bullhorn',
    },
    postList: {
      icon: 'i-fa6-solid:water',
    },
    pinnedPost: {
      icon: 'i-fa6-solid:anchor',
    },
    scrollDown: {
      icon: 'i-fa6-solid-angle-down',
    },
    toggleLocaleButton: {
      icon: 'i-ri-translate',
    },
    toggleDarkButton: {
      darkIcon: 'i-ri-moon-line',
      lightIcon: 'i-ri-sun-line',
    },
  },

  navbarTitle: '',

  favicon: false,

  hero: {
    title: 'Hello, sakura',
    motto: 'You got to put the past behind you before you can move on.',
    urls: [],
    randomUrls: false,
    fixedImg: false,
    style: '',

    typewriter: false,
    enableHitokoto: false,

    disablePictureInPicture: false,

    socialStyle: 'merge',
  },

  navbar: [],
  navbarOptions: {
    title: '',
    animIn: 'animation-fade-in-left',
    animOut: 'animation-fade-out-left',
    showMarker: true,
    offset: 100,
    enableHover: true,
    tools: ['toggleDark', 'search'],
    hamburgerStyle: 'uneven',
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

  postList: {
    text: '文章列表',

    settings: {
      card: {},
      grid: {},
      masonry: {},
    },
  },

  pinnedPost: {
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
    type: 'infinite-scroll',
    animation: true,
    infiniteScrollOptions: {
      preload: true,
    },
  },

  scrollDamping: false,
  scrollAnimation: true,
  scrollIndicator: false,
  scrollLock: true,
  scrollToTop: false,
  scrollDown: {
    enable: true,
  },
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const { navbar, sidebar, footer, ui } = themeConfig
  const footerIcon = footer?.icon?.img

  const safelist: string[] = []

  if (footerIcon)
    safelist.push(footerIcon)

  navbar?.forEach((navbarItem) => {
    if (navbarItem.icon)
      safelist.push(navbarItem.icon)

    if (Array.isArray(navbarItem.items)) {
      navbarItem.items.forEach((item) => {
        if (item.icon)
          safelist.push(item.icon)
      })
    }
  })

  sidebar?.forEach((sidebarItem) => {
    if (typeof sidebarItem !== 'string' && sidebarItem.icon)
      safelist.push(sidebarItem.icon)
  })

  if (ui.notice?.icon)
    safelist.push(ui.notice.icon)

  if (ui.scrollDown?.icon)
    safelist.push(ui.scrollDown.icon)

  if (ui.toggleLocaleButton?.icon)
    safelist.push(ui.toggleLocaleButton.icon)

  if (ui.toggleDarkButton?.darkIcon)
    safelist.push(ui.toggleDarkButton.darkIcon)
  if (ui.toggleDarkButton?.lightIcon)
    safelist.push(ui.toggleDarkButton.lightIcon)

  if (ui.postList?.icon)
    safelist.push(ui.postList.icon)

  if (ui.pinnedPost?.icon)
    safelist.push(ui.pinnedPost?.icon)

  return safelist
}
