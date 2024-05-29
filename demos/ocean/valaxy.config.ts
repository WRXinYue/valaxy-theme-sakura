import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    sidebar: [
      {
        text: '日志',
        link: '/',
      },
      {
        text: '图谱',
        link: '/graph',
      },
      {
        text: '全部页面',
        link: '/all-pages',
      },
    ],
  },
})
