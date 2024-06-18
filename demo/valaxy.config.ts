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
    colors: {
      primary: '#ff4e6a',
    },

    navbarTitle: ['かなしい', 'の', '心悦'],

    favicon: false,
    animation: true,

    banner: {
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/114448705_p0.png',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/optimize/cGZ4kz2q.webp',
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg',
      ],
      style: '',
    },

    noticeBoard: {
      message: '<b>这是一个公告信息, 主题开源地址请见: <a href="https://github.com/WRXinYue/valaxy-theme-sakura">https://github.com/WRXinYue/valaxy-theme-sakura</a></br>',
    },

    articlePinned: [
      {
        title: 'Valaxy Theme Sakura',
        desc: '本站使用的 valaxy sakura 主题',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-d6mryl.jpg',
        link: '/posts/theme-sakura',
      },
      {
        title: 'Valaxy sakura theme docs',
        desc: '主题文档',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-gpxyed.jpg',
        link: 'https://sakura.valaxy.site',
      },
      {
        title: '示例站点',
        desc: '(暂无)',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-jxqgjw.jpg',
      },
    ],

    pagination: {
      animation: true,
      infiniteScrollOptions: {
        preload: true,
      },
    },

    article: {
      navigationMerge: true,
    },

    navbar: [
      {
        text: '🌈 首页',
        link: '/',
      },
      {
        text: '📁 分类',
        link: '/categories',
      },
      {
        text: '🏷️ 标签',
        link: '/tags',
      },
      // {
      //   text: '☄️ 其他',
      //   link: '/',
      //   submenu: [],
      // },
      // {
      //   text: '📌 关于我',
      //   link: '/',
      // },
      {
        text: '🔦 时光轴',
        link: '/archives',
      },
      {
        text: '🍻 友情链接',
        link: '/links',
        submenu: [
          {
            text: 'GitHub',
            icon: 'i-ri-github-fill',
            link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
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
      },
      {
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: 'https://sakura.wrxinyue.org/atom.xml',
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
        img: '/favicon-16x16.ico',
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
        id: '2489775340',
        server: 'netease',
        type: 'playlist',
      },
      options: {
        autoHidden: true,
        animationIn: true,
        lyricHidden: true,
      },
    }),
    addonLive2d({
      live2dPath: {
        baseUrl: 'online',
      },
    }),
  ],
})
