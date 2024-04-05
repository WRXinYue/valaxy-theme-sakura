import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

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

    navbarTitle: ['Hello', '', 'Sakura'],
  },
})
