<h1 align="center">Valaxy Theme Sakura</h1>
<pre align="center">
🧪 Currently testing and perfecting theme samples and theme documentation
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
<a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md"><img src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" alt="Open in StackBlitz"></a>
</p>

- [简体中文](./README.md) | English

## 🌟 Features

- 🎪 Interactive docs & demos
- 🦾 **Type Strong**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc)

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

This project is heavily inspired by the following awesome projects.

- [YunYouJun](https://valaxy.site/)
- [wordpress-theme-sakura](https://github.com/mashirozx/sakura)
- [vitepress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
- [element-plus](https://github.com/element-plus/element-plus)
- [primevue](https://github.com/primefaces/primevue)
- [antfu.me](https://github.com/antfu/antfu.me)

And thanks to [all the contributors on GitHub](https://github.com/wrxinyue/valaxy-theme-sakura/graphs/contributors)!
