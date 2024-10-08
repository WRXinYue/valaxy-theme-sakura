import { defineConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-sakura'
import { addonMeting } from 'valaxy-addon-meting'
import { addonWaline } from 'valaxy-addon-waline'
import { addonLive2d } from 'valaxy-addon-live2d'
import { addonBangumi } from 'valaxy-addon-bangumi'
import { addonTwikoo } from 'valaxy-addon-twikoo'
import pkg from '../theme/package.json'

export default defineConfig<ThemeConfig>({
  theme: 'sakura',
  devtools: true,

  themeConfig: {
    colors: {
      primary: '#ff4e6a',
    },

    banner: {
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        // Source: https://www.pixiv.net/artworks/72203573
        'https://valaxy-theme-sakura.s3.bitiful.net/home-wallpaper.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper/yae-miko-sunset-sakura-genshin-impact-moewalls-com.mp4',
      ],
      // playerUrl: 'https://valaxy-theme-sakura.s3.bitiful.net/PV/563098369-1-208.mp4',
      playerUrl: 'https://valaxy-theme-sakura.s3.bitiful.net/PV/Original PV Little love song MONGOL 800 cover by Amatsuki.mp4',
      style: 'filter-dot',

      typewriter: true,
      enableHitokoto: true,
      waveTheme: 'horizontal',
    },

    notice: {
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

    scrollToTop: true,

    navbar: [
      {
        icon: 'i-line-md-home-md-twotone',
        locale: 'menu.home',
        link: '/',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-line-md-folder-twotone',
        locale: 'menu.categories',
        link: '/categories',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-line-md-folder-plus-twotone',
        locale: 'menu.archives',
        link: '/archives',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-line-md-hash-small',
        locale: 'menu.tags',
        link: '/tags',
        animated: 'animation-hvr-grow',
      },
      {
        text: pkg.author.name,
        icon: 'i-line-md-hazard-lights-filled',
        link: pkg.author.url,
        target: '_blank',
        animated: 'animation-hvr-icon-bounce',
      },
      {
        text: '友情链接',
        icon: 'i-line-md-link',
        link: '/links',
        animated: 'animation-hvr-icon-buzz-out',
        children: [
          {
            text: 'GitHub',
            icon: 'i-line-md-github-twotone',
            link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
          },
          {
            text: 'Discord',
            icon: 'i-line-md-discord-twotone',
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
        icon: 'i-line-md-rss',
        link: '/atom.xml',
        target: '_blank',
        animated: 'animation-hvr-icon-up',
      },
    ],
    navbarOptions: {
      title: ['さくら', 'の', '夢'],
      // invert: true,
      autoHide: true,
    },

    sidebar: [
      {
        text: '🌈',
        locale: 'menu.home',
        link: '/',
      },
      {
        text: '🗂️',
        locale: 'menu.archives',
        link: '/archives/',
      },
      {
        text: '📂',
        locale: 'menu.categories',
        link: '/categories/',
      },
      {
        text: '🏷️',
        locale: 'menu.tags',
        link: '/tags/',
      },
      {
        text: '🎯 清单',

        children: [
          {
            text: '电影 🎞️',
            link: '/movie',
          },
          {
            text: '番剧 🍨',
            link: '/anime',
          },
          {
            text: '游戏 🎮',
            link: '/game',
          },
          {
            text: '歌单 🎵',
            link: '/music',
          },
        ],
      },
      {
        text: '📝 留言板',
      },
      {
        text: '🍻 朋友圈',
      },
      {
        text: '❤️ 打赏',
      },
      {
        text: '📌',
        locale: 'menu.about',
      },
    ],
    sidebarOptions: {
      position: 'left',
    },

    tags: {
      rainbow: true,
    },

    footer: {
      since: 2024,

      icon: {
        img: '/favicon-16x16.ico',
        animated: true,
        url: 'https://wrxinyue.org',
        title: 'WRXinYue',
      },
    },

    toggleThemeIcon: {
      lightIcon: 'i-line-md-moon-alt-to-sunny-outline-loop-transition',
      darkIcon: 'i-line-md-sunny-outline-to-moon-loop-transition',
    },
  },

  addons: [
    addonWaline({
      serverURL: 'https://waline.wrxinyue.org',
      pageview: true,
      comment: true,
    }),
    addonTwikoo({
      envId: 'https://wrxinyue-twikoo.hf.space',
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
      enableLive2D: ['Tia', 'Pio', 'XiaoYun'],
      live2DCollection: {
        // https://github.com/AdingApkgg/live2d-api
        // https://cdn.jsdelivr.net/gh/adingapkgg/live2d-api/
        Asuna: {
          models: [
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_01/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_02/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_03/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_04/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_05/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_06/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_07/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_08/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_09/index.json',
            // 'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_10/index.json',
            // 'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_11/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_12/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_13/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_14/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_15/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_16/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_17/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_18/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_19/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_20/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_21/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_22/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_23/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_24/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_25/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_26/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_27/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_28/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_29/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_30/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_31/index.json',
            // 'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_32/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_33/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_34/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_35/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_36/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_37/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_38/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_39/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_40/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_41/index.json',
            // 'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_42/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_43/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_44/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_45/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/asuna/asuna_46/index.json',
          ],
        },
        Type95: {
          models: [
            'https://registry.npmmirror.com/weblive2d/latest/files/model/95type/95type_3702/normal/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/95type/95type_3702/destroy/index.json',
          ],
        },
        HK416: {
          models: [
            'https://registry.npmmirror.com/weblive2d/latest/files/model/HK416/HK416_3401/destroy/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/HK416/HK416_3401/normal/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/HK416/HK416_805/normal/index.json',
            'https://registry.npmmirror.com/weblive2d/latest/files/model/HK416/HK416_805/destroy/index.json',
          ],
        },
      },
    }),
    addonBangumi({
      api: 'https://yi_xiao_jiu-bangumi.web.val.run',
      bilibiliUid: '1579790',
      bgmEnabled: false,
    }),
  ],

  vite: {
    optimizeDeps: {
      include: [
        'd3',
        '@pixi/graphics',
        '@pixi/settings',
        '@pixi/app',
        '@pixi/core',
        '@pixi/extract',
        '@pixi/interaction',
        '@pixi/ticker',
        'lodash-es',
      ],
    },
  },
})
