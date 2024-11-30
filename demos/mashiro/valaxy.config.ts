import { defineValaxyConfig } from 'valaxy'
import { addonMeting } from 'valaxy-addon-meting'
import { addonWaline } from 'valaxy-addon-waline'
import { addonLive2d } from 'valaxy-addon-live2d'
import { addonBangumi } from 'valaxy-addon-bangumi'
import pkg from 'valaxy-theme-sakura/package.json'
import type { ThemeUserConfig } from '@valaxy-theme-sakura/mashiro'
import { Mashiro } from '@valaxy-theme-sakura/mashiro'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',
  devtools: true,

  themeConfig: {
    theme: {
      default: Mashiro.name,
      extends: [Mashiro],
    },

    banner: {
      title: 'HI, MASHIRO!',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        // Source: https://www.pixiv.net/artworks/72203573
        'https://w.wallhaven.cc/full/5g/wallhaven-5gx725.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper/yae-miko-sunset-sakura-genshin-impact-moewalls-com.mp4',
      ],
      playerUrl: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/The Pet Girl of Sakurasou.mp4',

      socials: [
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/github.png',
          link: 'http://github.com/mashirozx',
        },
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/sina.png',
          link: 'http://weibo.com/mashirozx?is_all=1',
        },
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/telegram.svg',
          link: 'https://t.me/SakurasoNoMashiro',
        },
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/Mastodon_Logotype_Simple.svg',
          link: 'https://hello.2heng.xin/@mashiro',
        },
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/wangyiyun.png',
          link: 'https://music.163.com/m/user/home?id=2655217',
        },
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/twitter.png',
          link: 'https://x.com/2hengxin',
        },
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/zhihu.png',
          link: 'https://www.zhihu.com/people/young-dolphin',
        },
        {
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/theming-demos/mashiro/email.svg',
          link: 'mailto:me@moezx.cc',
        },
      ],
    },

    postPinned: {
      entries: [
        {
          title: 'Valaxy Theme Sakura',
          desc: '本站使用的 valaxy sakura 主题',
          img: 'https://valaxy-theme-sakura.s3.bitiful.net/demo/2024-09-29.png',
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
    },

    pagination: {
      infiniteScrollOptions: {
        preload: true,
      },
    },

    scrollToTop: true,

    navbar: [
      {
        icon: 'i-fa-fort-awesome',
        locale: 'menu.home',
        link: '/',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-fa-archive',
        locale: 'menu.archives',
        link: '/archives',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-fa-list-ul',
        text: '清单',
        link: '',
        animated: 'animation-hvr-grow',
        items: [
          {
            icon: 'i-fa-film',
            text: '番剧',
            link: '/anime',
          },
        ],
      },
      {
        icon: 'i-fa-edit',
        text: '留言板',
        link: '/comment',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-fa-chain',
        text: '友人账',
        link: '/friends',
        animated: 'animation-hvr-grow',
      },
      {
        text: '赞赏',
        icon: 'i-fa-heart',
        link: pkg.author.url,
        target: '_blank',
        animated: 'animation-hvr-icon-bounce',
      },
      {
        text: '关于',
        icon: 'i-fa-leaf',
        link: pkg.author.url,
        target: '_blank',
        animated: 'animation-hvr-icon-bounce',
      },
      {
        text: 'RSS',
        icon: 'i-fa-feed',
        link: '/atom.xml',
        target: '_blank',
        animated: 'animation-hvr-icon-up',
      },
    ],
    navbarOptions: {
      title: ['さくら荘', 'の', '白猫'],
      subtitle: '樱花庄的白猫',
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
    resolve: {
      alias: {
        'valaxy-theme-sakura': 'valaxy-theme-sakura',
      },
    },
  },
})
