import type { ThemeConfig, ThemeUserConfig } from '../types'

export const defaultThemeConfig: ThemeUserConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  theme: {
    primary: '#0078E7',
  },

  navbarTitle: '',

  favicon: false,

  hero: {
    title: 'Hello, sakura',
    motto: 'You got to put the past behind you before you can move on.',
    urls: [],
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
    icon: 'i-fa6-solid:water',
    text: '文章列表',

    settings: {
      card: {},
      grid: {},
      masonry: {},
    },
  },

  postPinned: {
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
    icon: 'i-fa6-solid-angle-down',
  },

  toggleLocaleIcon: 'i-ri-translate',
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
  const { navbar, sidebar, footer, toggleLocaleIcon, toggleThemeIcon, postPinned, postList } = themeConfig
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

  if (themeConfig.scrollDown?.icon)
    safelist.push(themeConfig.scrollDown.icon)

  if (toggleLocaleIcon)
    safelist.push(toggleLocaleIcon)

  if (toggleThemeIcon?.darkIcon)
    safelist.push(toggleThemeIcon.darkIcon)
  if (toggleThemeIcon?.lightIcon)
    safelist.push(toggleThemeIcon.lightIcon)

  if (postList?.icon)
    safelist.push(postList.icon)

  if (postPinned?.icon)
    safelist.push(postPinned?.icon)

  if (themeConfig.theme?.extends) {
    themeConfig.theme.extends.forEach(({ preset }) => {
      safelist.push(...generateSafelist(preset as ThemeConfig))
    })
  }

  return safelist
}
