/// <reference types="vite/client" />

import type { ThemeExtend, ThemeUserConfig } from 'valaxy-theme-sakura'

export const SakurairoConfig: ThemeUserConfig = {
  navbarOptions: {
    enableHover: false,
  },

  hero: {
    fixedImg: true,

    socialStyle: 'single',
  },

  postList: {
    settings: {
      card: {
        defaultImage: true,
      },
    },
  },
}

export const sakurairoComponents = {
  SakurairoPostCard: () => import('../components/SakurairoPostCard.vue'),
}

export const Sakurairo: ThemeExtend = {
  name: 'sakurairo',
  preset: SakurairoConfig,
}
