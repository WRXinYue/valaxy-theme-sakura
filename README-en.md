<h1 align="center">Valaxy Theme Sakura</h1>
<pre align="center">
🧪 Currently testing and perfecting theme samples and theme documentation | <a href="https://sakura.valaxy.site/">Docs</a> | <a href="https://sakura.wrxinyue.org/">Demo</a> | <a href="./README.md">中文</a>
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
<a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md"><img src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" alt="Open in StackBlitz"></a>
</p>

### Usage

**Install theme:**

```bash
pnpm create valaxy
pnpm add valaxy-theme-sakura
```

**Activate theme:**

<details>

```ts
// valaxy.config.ts
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

/**
 * User Config
 */
export default defineValaxyConfig<ThemeUserConfig>({
  // site config see site.config.ts

  theme: 'sakura',

  themeConfig: {
    // colors: {
    //   primary: '#e67474', // Theme color
    // },

    navbarTitle: ['かなしい', 'の', '心悦'],

    favicon: false, // Navbar icon

    banner: {
      // Wallpaper supports both images and videos
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg'
      ],
      // Background style options:
      // - '': No effect, display the original image
      // - 'filter-dim': Shadow effect
      // - 'filter-grid': Grid effect
      // - 'filter-dot': Dot effect
      style: '',
    },

    articlePinned: [
      {
        title: 'Valaxy Theme Sakura',
        desc: 'The Valaxy Sakura theme used by this site',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-d6mryl.jpg',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
      {
        title: 'Valaxy sakura theme docs',
        desc: 'Theme documentation',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-gpxyed.jpg',
        link: 'https://sakura.valaxy.site/',
      },
      {
        title: 'Example site',
        desc: 'https://sakura.wrxinyue.org/',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-jxqgjw.jpg',
        link: 'https://sakura.wrxinyue.org/',
      },
    ],

    pagination: {
      animation: true,
      infiniteScrollOptions: {
        preload: true,
      },
    },

    article: {
      navigationMerge: true,
    },

    // Navbar
    navbar: [
      {
        text: '🌈 Home',
        link: '/',
      },
      {
        text: '📁 Categories',
        link: '/categories',
      },
      {
        text: '🏷️ Tags',
        link: '/tags',
      },
      {
        text: '🔦 Archives',
        link: '/archives',
      },
      {
        text: '🍻 Links',
        link: '/links',
        submenu: [
          {
            text: 'GitHub',
            icon: 'i-ri-github-fill',
            link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
          },
          {
            text: 'Discord',
            icon: 'i-ri-discord-fill',
            link: 'https://discord.gg/sGe4U4p4CK',
          },
          {
            text: 'Valaxy →',
            icon: 'i-ri-cloud-fill',
            link: 'https://github.com/YunYouJun/valaxy',
          },
        ],
      },
      {
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: 'https://sakura.wrxinyue.org/atom.xml',
      },
    ],

    sidebar: [
      {
        text: 'Home',
        icon: 'i-ri-home-4-line',
        link: '/',
      },
      {
        locale: 'menu.archives',
        icon: 'i-ri-archive-line',
        link: '/archives/',
      },
      {
        locale: 'menu.categories',
        icon: 'i-ri-folder-2-line',
        link: '/categories/',
      },
      {
        locale: 'menu.tags',
        icon: 'i-ri-price-tag-3-line',
        link: '/tags/',
      },
    ],

    // Footer configuration
    footer: {
      since: 2024,

      icon: {
        img: '/favicon-16x16.ico',
        animated: true,
        url: 'https://wrxinyue.org',
        title: 'WRXinYue',
      },
    },
  },
})
```

<br></details>

**Update Theme:**

```bash
pnpm up valaxy-theme-sakura --latest
```

### Thanks

- [YunYouJun](https://valaxy.site/)
- [樱花庄的白猫博客主题](https://github.com/mashirozx/sakura)
- [hexo-theme-sakura](https://github.com/honjun/hexo-theme-sakura)
- [vitepress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
