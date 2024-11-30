/// <reference types="vite/client" />

import type { ThemeExtend } from 'valaxy-theme-sakura'
import type { ThemeUserConfig } from '../types'

export const MashiroConfig: ThemeUserConfig = {
  theme: {
    primary: '#fe9500',
  },

  banner: {
    waveTheme: 'horizontal',
    style: 'filter-dot',
    fixedImg: true,
  },
  navbarOptions: {
    offset: 0,
    invert: ['home'],
    showMarker: false,
    autoHide: ['home'],
    tools: ['toggleTheme', 'search'],
  },
  postList: {
    icon: 'i-fa-envira',
    text: 'Discovery',

    settings: {
      card: {
        isImageReversed: true,
        defaultImage: 'https://img.xjh.me/random_img.php?type=bg&return=302',
      },
    },
  },

  postFooter: {
    navigationMerge: true,
  },
  postPinned: {
    icon: 'i-fa-anchor',
    text: 'START:DASH!!',
  },

  pagination: {
    animation: true,
    infiniteScrollOptions: { preload: false },
  },

  scrollIndicator: true,
  scrollLock: false,
  scrollDown: {
    icon: 'i-fa-chevron-down',
  },
}

export const Mashiro: ThemeExtend = {
  name: 'mashiro',
  preset: MashiroConfig,
}
