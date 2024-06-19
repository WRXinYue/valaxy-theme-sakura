---
title: Config examples
title_zh-CN: 配置示例
toc: true
categories:
  - examples
codeHeightLimit: 300
---

## 配置示例

### 示例1

<https://github.com/WRXinYue/valaxy-theme-sakura/blob/main/demo/valaxy.config.ts>

~~~ts
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
    //   primary: '#e67474', // 主题色
    // },

    navbarTitle: ['かなしい', 'の', '心悦'],

    favicon: false, // 导航栏图标

    banner: {
      // 壁纸支持图片及视频
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg'
      ],
      // 背景样式选项:
      // - '': 无特效，显示原图
      // - 'filter-dim': 阴影效果
      // - 'filter-grid': 横条效果
      // - 'filter-dot': 点点效果
      style: '',
    },

    articlePinned: [
      {
        title: 'Valaxy Theme Sakura',
        desc: '本站使用的 valaxy sakura 主题',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-d6mryl.jpg',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
      {
        title: 'Valaxy sakura theme docs',
        desc: '主题文档',
        img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-gpxyed.jpg',
        link: 'https://sakura.valaxy.site/',
      },
      {
        title: '示例站点',
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

    // 导航栏
    navbar: [
      {
        text: '🌈 首页',
        link: '/',
      },
      {
        text: '📁 分类',
        link: '/categories',
      },
      {
        text: '🏷️ 标签',
        link: '/tags',
      },
      {
        text: '🔦 时光轴',
        link: '/archives',
      },
      {
        text: '🍻 友情链接',
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
        text: '首页',
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

    // 页脚配置
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
~~~
