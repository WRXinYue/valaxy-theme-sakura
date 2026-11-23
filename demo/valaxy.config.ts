import type { ThemeUserConfig } from 'valaxy-theme-sakura'
import { defineValaxyConfig } from 'valaxy'
import { addonBangumi } from 'valaxy-addon-bangumi'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import { addonWaline } from 'valaxy-addon-waline'

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
    },

    hero: {
      title: 'HI, SAKURA!',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper/yae-miko-4k30.mp4',
        'https://www.youtube.com/watch?v=OWDcn7hl16A&list=RDmu-semky9Ls&index=2',
        'https://valaxy-theme-sakura.s3.bitiful.net/PV/563098369-1-208.mp4',
        'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/The Pet Girl of Sakurasou.mp4',
        'https://valaxy-theme-sakura.s3.bitiful.net/PV/Original PV Little love song MONGOL 800 cover by Amatsuki.mp4',
        'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
      ],
      style: 'dim',
      fixedImg: true,
      typewriter: true,
      enableHitokoto: true,
      // waveTheme: 'ripple',
    },

    notice: {
      message: '该项目是开源的！主题开源地址请见: <a href="https://github.com/WRXinYue/valaxy-theme-sakura">https://github.com/WRXinYue/valaxy-theme-sakura</a>',
    },

    pinnedPost: {
      text: 'START:DASH!!',

      entries: [
        {
          title: 'Hello, Valaxy!',
          desc: 'Valaxy 介绍',
          link: '/posts/hello-valaxy',
        },
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
      categoryOrder: ['getting-started'],

      isImageReversed: true,
      // defaultImage: ['https://www.dmoe.cc/random.php?random', 'https://www.loliapi.com/acg/pc/?random'],
      // defaultImage: ['https://www.dmoe.cc/random.php?random', 'https://img.xjh.me/random_img.php?random?type=bg&return=302'],

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
        locale: 'menu.home',
        link: '/',
      },
      {
        locale: 'menu.quick_start',
        link: '/posts/guide/getting-started/installation',
      },
      {
        locale: 'menu.tags',
        link: '/tags/',
      },
      {
        locale: 'menu.archives',
        link: '/archives',
      },
      {
        text: '番剧',
        // locale: 'menu.anime',
        link: '/anime',
      },
      {
        text: '留言板',
        link: '/comment',
      },
      {
        text: '友情链接',
        link: '/links',
      },
      {
        text: '发行',
        link: '/posts/releases',
      },
      {
        text: '关于',
        link: '/about',
        target: '_blank',
      },
    ],
    navbarOptions: {
      offset: 0,
      invert: ['home'],
      showMarker: false,
      autoHide: ['home'],
    },
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
        url: 'https://wrxinyue.org',
        title: 'WRXinYue',
      },
    },

    // scrollToTop: true,
    scrollIndicator: true,
    scrollLock: false,
    // scrollDamping: true,
  },

  addons: [
    addonWaline({
      serverURL: 'https://waline.wrxinyue.org',
      pageview: true,
      comment: true,
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
