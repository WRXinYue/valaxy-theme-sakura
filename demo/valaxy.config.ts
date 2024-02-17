import { defineConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-sakura'

import { addonMeting } from 'valaxy-addon-meting'
import { addonWaline } from 'valaxy-addon-waline'
import { addonLive2d } from 'valaxy-addon-live2d'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'sakura',

  themeConfig: {
    // colors: {
    //   primary: '#e67474',
    // },

    prefixName: 'かなしいの',
    siteName: '心悦',

    homeTitle: 'Hello, sakura',
    homeMotto: 'You got to put the past behind you before you can move on.',

    favicon: false,

    headerWallpaper: {
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg',
      ],
      backgroundStyle: 'filter-dot',
    },

    nav: [
      {
        text: 'GitHub',
        icon: 'i-ri-github-fill',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
      {
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: '/atom.xml',
      },
      {
        text: 'Discord',
        icon: 'i-ri-discord-fill',
        link: 'https://discord.gg/sGe4U4p4CK',
      },
      {
        text: 'Valaxy →',
        icon: 'i-ri-cloud-fill',
        link: 'https://github.com/YunYouJun/valaxy',
      },
    ],

    sidebar: [
      {
        text: '首页',
        icon: 'i-ri-home-4-line',
        link: '/',
      },
      {
        locale: 'menu.archives',
        icon: 'i-ri-archive-line',
        link: '/archives/',
      },
      {
        locale: 'menu.categories',
        icon: 'i-ri-folder-2-line',
        link: '/categories/',
      },
      {
        locale: 'menu.tags',
        icon: 'i-ri-price-tag-3-line',
        link: '/tags/',
      },
    ],

    footer: {
      since: 2024,

      icon: {
        img: '/favicon.ico',
        animated: true,
        url: 'https://wrxinyue.org',
        title: 'WRXinYue',
      },
    },
  },

  addons: [
    addonWaline({
      serverURL: 'https://waline.wrxinyue.org',
      pageview: true,
      comment: true,
    }),
    addonMeting({
      global: true,
      props: {
        id: '7426988124',
        server: 'netease',
        type: 'playlist',
      },
    }),
    addonLive2d({
      live2dPath: 'live2d/',
    }),
  ],
})

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const safelist: string[] = []

  const footerIcon = themeConfig.footer?.icon?.name
  if (footerIcon)
    safelist.push(footerIcon)

  return safelist
}
