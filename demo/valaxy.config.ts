import type { ThemeUserConfig } from 'valaxy-theme-sakura'
import { defineValaxyConfig } from 'valaxy'
import { addonBangumi } from 'valaxy-addon-bangumi'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import { addonMeting } from 'valaxy-addon-meting'
import { addonWaline } from 'valaxy-addon-waline'
import pkg from 'valaxy-theme-sakura/package.json'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',
  devtools: true,

  themeConfig: {
    ui: {
      primary: '#fe9500',

      toggleDarkButton: {
        lightIcon: 'i-line-md-moon-alt-to-sunny-outline-loop-transition',
        darkIcon: 'i-line-md-sunny-outline-to-moon-loop-transition',
      },
      pinnedPost: {
        icon: 'i-fa-anchor',
      },
      postList: {
        icon: 'i-fa-envira',
      },
      scrollDown: {
        icon: 'i-fa-chevron-down',
      },
    },

    hero: {
      title: 'HI, SAKURA!',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-858k3j.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-3l2vm3.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-3z9dz9.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-rrdgp1.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-zyxq6j.jpg',
        // Source: https://www.pixiv.net/artworks/72203573
        'https://valaxy-theme-sakura.s3.bitiful.net/home-wallpaper.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper/yae-miko-sunset-sakura-genshin-impact-moewalls-com.mp4',
      ],
      randomUrls: true,
      // playerUrl: 'https://valaxy-theme-sakura.s3.bitiful.net/PV/563098369-1-208.mp4',
      playerUrl: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/The Pet Girl of Sakurasou.mp4',
      // playerUrl: 'https://valaxy-theme-sakura.s3.bitiful.net/PV/Original PV Little love song MONGOL 800 cover by Amatsuki.mp4',
      style: 'dim',
      fixedImg: true,
      typewriter: true,
      enableHitokoto: true,
    },

    notice: {
      message: '<b>这是一个公告信息, 主题开源地址请见: <a href="https://github.com/WRXinYue/valaxy-theme-sakura">https://github.com/WRXinYue/valaxy-theme-sakura</a></br>',
    },

    pinnedPost: {
      text: 'START:DASH!!',

      entries: [
        {
          title: 'Docs',
          desc: '主题文档',
          link: 'https://sakura.valaxy.site',
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-yxoejx.jpg',
        },
        {
          title: 'About',
          desc: '关于主题',
          link: '/about',
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-3l2vm3.jpg',
        },
        {
          title: 'Valaxy Docs',
          desc: 'Valaxy 文档',
          link: 'https://valaxy.site',
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-zyxq6j.jpg',
        },
      ],
    },

    pagination: {
      animation: true,
      infiniteScrollOptions: {
        preload: true,
      },
    },

    postList: {
      text: 'Discovery',

      isImageReversed: true,
      // defaultImage: ['https://www.dmoe.cc/random.php?random', 'https://www.loliapi.com/acg/pc/?random'],
      defaultImage: ['https://www.dmoe.cc/random.php?random', 'https://img.xjh.me/random_img.php?random?type=bg&return=302'],

      responsive: {
        '2xl': 3,
        'xl': 3,
        'lg': 2,
        'md': 2,
        'sm': 1,
      },
    },

    postFooter: {
      navigationMerge: true,
    },

    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/WRXinYue/valaxy-theme-sakura',
        avatar: 'https://github.com/WRXinYue.png',
        desc: 'Theme Source',
      },
      {
        name: 'Valaxy',
        url: 'https://valaxy.site',
        avatar: 'https://valaxy.site/favicon.svg',
        desc: 'Valaxy Doc',
      },
    ],

    navbar: [
      {
        icon: 'i-fa-fort-awesome',
        locale: 'menu.home',
        link: '/',
      },
      {
        icon: 'i-line-md-folder-twotone',
        locale: 'menu.categories',
        link: '/categories',
      },
      {
        icon: 'i-fa-archive',
        locale: 'menu.archives',
        link: '/archives',
      },
      {
        icon: 'i-fa-film',
        text: '番剧',
        // locale: 'menu.anime',
        link: '/anime',
      },
      {
        icon: 'i-fa-edit',
        text: '留言板',
        link: '/comment',
      },
      {
        text: '友情链接',
        icon: 'i-fa-chain',
        link: '/links',
        items: [
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
        text: pkg.author.name,
        icon: 'i-line-md-hazard-lights-filled',
        link: pkg.author.url,
        target: '_blank',
      },
      {
        text: '关于',
        icon: 'i-fa-leaf',
        link: '/about',
        target: '_blank',
      },
      {
        text: 'RSS',
        icon: 'i-fa-feed',
        link: '/atom.xml',
        target: '_blank',
      },
    ],
    navbarOptions: {
      title: ['Valaxy Theme', 'Sakura'],
      subTitle: '一个基于 valaxy 的 sakura 主题',
      offset: 0,
      invert: ['home'],
      showMarker: false,
      autoHide: ['home'],
    },
    layout: {
      general: {
        layout: 'triple-columns',
        sidebar: {
          left: [
            'SakuraSidebarSiteInfo',
            'SakuraSidebarCategories',
            'SakuraSidebarTags',
            'SakuraSidebarLinks',
          ],
          right: [
            'SakuraSidebarMusic',
            'SakuraSidebarLatestPosts',
            'SakuraSidebarLatestComments',
          ],
        },
      },
      home: {
        layout: 'triple-columns',
        sidebar: {
          left: [
            'SakuraSidebarSiteInfo',
            'SakuraSidebarCategories',
            'SakuraSidebarTags',
            'SakuraSidebarLinks',
          ],
          right: [
            'SakuraSidebarMusic',
            'SakuraSidebarLatestPosts',
            'SakuraSidebarLatestComments',
          ],
        },
      },
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

        items: [
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

    scrollToTop: true,
    scrollIndicator: true,
    scrollLock: false,
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
        id: '2963327092',
        server: 'netease',
        type: 'playlist',
      },
      options: {
        autoHidden: true,
        animationIn: true,
        lyricHidden: true,
      },
    }),
    addonBangumi({
      api: 'https://yi_xiao_jiu-bangumi.web.val.run',
      bilibiliUid: '438788541',
      bgmEnabled: false,
    }),
    // addonBackgrounds({}),
    addonHitokoto({
      api: 'intl',
    }),
  ],
})
