import { defineConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-sakura'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'sakura',

  themeConfig: {
    // colors: {
    //   primary: 'red',
    // },

    prefixName: 'かなしいの',
    siteName: '心悦',

    homeTitle: 'Hello, sakura',
    homeMotto: 'You got to put the past behind you before you can move on.',

    favicon: false,

    headerWallpaper: {
      type: 'video',
      imageUrl: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg',
      videoUrl: 'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',

      backgroundStyle: 'filter-dot',
    },

    nav: [
      {
        text: 'GitHub',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
      {
        text: 'RSS',
        link: '/atom.xml',
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/sGe4U4p4CK',
      },
      {
        text: 'Valaxy →',
        link: 'https://github.com/YunYouJun/valaxy',
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
})
