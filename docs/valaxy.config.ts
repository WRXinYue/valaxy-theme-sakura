import { defineValaxyConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-sakura'
import { addonWaline } from 'valaxy-addon-waline'
import { addonGitLog } from 'valaxy-addon-git-log'
import tsdocPlugin from 'vite-plugin-tsdoc'

export default defineValaxyConfig<ThemeConfig>({
  siteConfig: {
    title: 'Sakura Docs',
    url: 'https://sakura.wrxinyue.org',
    description: 'Valaxy Sakura Theme Site Docs',

    social: [
      {
        name: 'GitHub',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
        icon: 'i-ri-github-line',
        color: '#a29bfe',
      },
      {
        name: 'NPM',
        link: 'https://www.npmjs.com/package/valaxy-theme-sakura',
        icon: 'i-ri-npmjs-fill',
        color: '#eb4d4b',
      },
      {
        name: 'RSS',
        link: '/atom.xml',
        icon: 'i-ri-rss-line',
        color: '#f9ca24',
      },
    ],

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
    colors: {
      primary: '#ff4e6a',
    },

    navbar: [
      {
        text: 'Docs',
        link: '/guide/installation',
        children: [
          {
            text: 'Quick Start',
            link: '/guide/installation',
          },
          {
            text: 'Config',
            link: '/config/theme',
          },
          {
            text: 'Examples',
            link: '/examples/config',
          },
        ],
      },
      // {
      //   text: 'Themes',
      // },
      {
        text: 'Gallery',
        link: '/examples/gallery',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
    ],
    navbarOptions: {
      title: ['𝑽𝒂𝒍𝒂𝒙𝒚 𝑻𝒉𝒆𝒎𝒆', '', '𝑺𝒂𝒌𝒖𝒓𝒂'],
      showMarker: false,
    },

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
      'styles',
      'layouts',
      'components-custom',
      'components-layout',
      'components',
      'components-themes',
      'examples',
      'releases',
      'dev',
    ],

    pagination: {
      itemsPerPage: 6,
    },

    footer: {
      since: 2024,
      icp: '<a href="https://icp.gov.moe/?keyword=20240132" target="_blank">萌ICP备20240132号</a>',
    },
  },
  addons: [
    addonWaline({
      serverURL: 'https://waline.wrxinyue.org',
      pageview: true,
      comment: true,
    }),
    addonGitLog({
      debug: true,
      contributor: {
        mode: 'api',
        // logArgs: '--first-parent --follow',
      },
      repositoryUrl: 'https://github.com/WRXinYue/valaxy-theme-sakura.git',
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ['d3', 'monaco-editor'],
    },
    plugins: [
      tsdocPlugin({ theme: 'sakura' }),
    ],
  },
})
