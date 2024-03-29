import { defineValaxyConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-sakura'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

export default defineValaxyConfig<ThemeConfig>({
  siteConfig: {
    title: 'Sakura Docs',
    url: 'https://sakura.wrxinyue.org',
    description: 'Valaxy Sakura Theme Site Docs',
    author: {
      name: 'WRXinYue',
    },

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

  theme: 'sakura',
  themeConfig: {
    navbarTitle: ['Valaxy Theme', '', 'Sakura'],

    // addons: [
    //   addonAlgolia({
    //     appId: '7MV77DWO4A',
    //     apiKey: '9b9438ca112ab7c044c985c2daa1190b',
    //     indexName: 'valaxysite',
    //   }),
    //   addonComponents(),
    // ],

    sidebar: [
      'getting-started',
      'config',
      'theme',
      'layouts',
      'components',
      'releases',
    ],

    pagination: {
      itemsPerPage: 3,
    },

    footer: {
      since: 2024,
      icp: '<a href="https://icp.gov.moe/?keyword=20240113" target="_blank">萌ICP备20240113号</a>',
    },
  },
  vite: {
    plugins: [
      monacoEditorPlugin({}),
    ],
  },
})
