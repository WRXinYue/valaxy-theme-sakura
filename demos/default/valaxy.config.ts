import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    banner: {
      title: '云游君的小站',
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
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: 'https://sakura.wrxinyue.org/atom.xml',
      },
    ],
  },
})
