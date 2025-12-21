import type { ThemeConfig } from 'valaxy-theme-oceanus'
import type { ThemeConfig as SakuraThemeConfig } from 'valaxy-theme-sakura'
import { defineValaxyConfig } from 'valaxy'
import { ValaxyThemesResolver } from 'valaxy-addon-components'
import { addonWaline } from 'valaxy-addon-waline'
import { defaultThemeConfig } from 'valaxy-theme-sakura/node'

export default defineValaxyConfig<ThemeConfig & SakuraThemeConfig>({
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

  theme: 'oceanus',
  themeConfig: {
    ...defaultThemeConfig,

    ui: {
      primary: '#ff4e6a',
    },

    navTitle: '𝑽𝒂𝒍𝒂𝒙𝒚 𝑻𝒉𝒆𝒎𝒆 𝑺𝒂𝒌𝒖𝒓𝒂',

    nav: [
      {
        text: '主页',
        link: '/',
      },
      {
        text: '指南',
        link: '/guide/getting-started/installation',
        sidebar: ['getting-started', 'theme-config'],
        subNav: [
          {
            text: '安装',
            link: '/guide/getting-started/installation',
          },
          {
            text: '更新 ',
            link: '/guide/getting-started/update',
          },
          {
            text: '主题配置',
            link: '/guide/getting-started/theme-config',
          },
          {
            text: '站点配置',
            link: '/guide/getting-started/site-config',
          },
          {
            text: 'frontmatter 配置',
            link: '/guide/getting-started/frontmatter-config',
          },
          {
            text: '特殊页面',
            link: '/guide/special-pages',
          },
        ],
      },
      {
        text: '示例',
        link: '/examples/config',
      },
      {
        text: '组件',
        link: '/components',
      },
      {
        text: '发行',
        link: '/releases',
      },
      // {
      //   text: 'Gallery',
      //   link: '/examples/gallery',
      // },
    ],

    navTools: [
      ['toggleLocale', 'togglTheme', { icon: 'i-ri-github-fill', link: 'https://github.com/WRXinYue/valaxy-theme-sakura' }],
      ['search'],
    ],

    hero: {
      title: 'VALAXY THEME SAKURA',
      motto: '开放、高自由、功能丰富的 valaxy 主题',
      img: 'https://w.wallhaven.cc/full/pk/wallhaven-pkkgy9.jpg',
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
      'special-pages',
    ],

    footer: {
      since: 2024,
      icp: '<a href="https://icp.gov.moe/?keyword=20240132" target="_blank">萌ICP备20240132号</a>',
    },

    gitLog: {
      repositoryUrl: 'https://github.com/WRXinYue/valaxy-theme-sakura.git',
      contributor: {
        mode: 'api',
        // logArgs: '--first-parent --follow',
      },
    },
  },
  addons: [
    addonWaline({
      serverURL: 'https://waline.wrxinyue.org',
      pageview: true,
      comment: true,
    }),
  ],
  components: {
    resolvers: [ValaxyThemesResolver({ themes: ['sakura'] })],
  },
  vite: {
    optimizeDeps: {
      include: ['d3', 'monaco-editor'],
    },
  },
})
