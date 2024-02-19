import process from 'node:process'
import { defineValaxyConfig } from 'valaxy'
import type { PressTheme } from 'valaxy-theme-press'
import { addonAlgolia } from 'valaxy-addon-algolia'
import { addonComponents } from 'valaxy-addon-components'

const COMMIT_ID = process.env.CF_PAGES_COMMIT_SHA || process.env.COMMIT_REF
const commitRef = COMMIT_ID?.slice(0, 8) || 'dev'

const safelist = [
  'i-ri-home-line',

  'i-ri-github-line',
]

export default defineValaxyConfig<PressTheme.Config>({
  siteConfig: {
    title: 'Sakura Docs',
    url: 'https://sakura.wrxinyue.org',
    description: 'Valaxy Sakura Theme Site Docs',

    search: {
      enable: false,
      type: 'algolia',
    },
    encrypt: {
      enable: true,
    },

    mediumZoom: {
      enable: true,
    },
  },

  addons: [
    addonAlgolia({
      appId: '7MV77DWO4A',
      apiKey: '9b9438ca112ab7c044c985c2daa1190b',
      indexName: 'valaxysite',
    }),
    addonComponents(),
  ],

  theme: 'press',
  themeConfig: {
    logo: '/favicon.svg',
    sidebar: [
      'getting-started',
      'guide',
      {
        text: 'category.config',
        collapsed: false,
        items: [
          {
            text: 'toc.base-config',
            link: '/guide/config/',
          },
          {
            text: 'toc.extend-config',
            link: '/guide/config/extend',
          },
        ],
      },
      'migration',
      'built-ins',
      'third',
      'custom',
      'examples',
      'theme',
      'addon',
      'dev',
    ],
    socialLinks: [
      { icon: 'i-ri-github-line', link: 'https://github.com/YunYouJun/valaxy' },
    ],
    nav: [
      {
        text: 'nav.guide',
        link: '/guide/getting-started',
      },
    ],

    footer: {
      message: `Released under the MIT License. (<a href="https://github.com/WRXinYue/valaxy/commit/${commitRef}" target="_blank" alt=${commitRef}>${commitRef}</a>)`,
      copyright:
        'Copyright © 2024-present <a href="https://github.com/WRXinYue" target="_blank">WRXinYue</a>',
    },
  },

  vite: {
    base: '/',
  },
  unocss: {
    safelist,
  },

  markdown: {
    blocks: {
      tip: {
        icon: 'i-carbon-thumbs-up',
      },
      warning: {
        icon: 'i-carbon-warning-alt',
      },
      danger: {
        icon: 'i-carbon-warning',
      },
      info: {
        icon: 'i-carbon-information',
      },
    },

    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        },
      },
    ],
    // theme: 'material-theme-palenight',
  },
})
