import type { ThemeUserConfig } from 'valaxy-theme-sakura'
import { defineValaxyConfig } from 'valaxy'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    banner: {
      title: 'Sakura 双栏布局示例站点',
    },

    pagination: {
      infiniteScrollOptions: {
        preload: true,
      },
      itemsPerPage: 2,
    },

    notFoundImage: '/404.gif',

    navbarTitle: ['Hello', '', 'Sakura'],

    navbar: [
      {
        text: '🏠',
        link: '/',
      },
      {
        text: '📁',
        link: '/categories',
      },
      {
        text: '🏷️',
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
        text: '🔦',
        link: '/archives',
      },
      {
        text: '🍻',
        link: '/links',
      },
      {
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: 'https://sakura.wrxinyue.org/atom.xml',
      },
    ],
  },
})
