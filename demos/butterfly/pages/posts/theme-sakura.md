---
title: Valaxy 主题 Sakura 🌸
tags: [sakura]
cover: https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/optimize/60651947_p0.webp
date: 2024-12-31
---

### 如何使用

**安装主题:**

~~~bash
# pnpm (推荐)
pnpm create valaxy

# 如果没有pnpm使用 npm install -g pnpm 来进行安装
# npm
# npm init valaxy
# yarn
# yarn create valaxy
pnpm add valaxy-theme-sakura
~~~

**启用主题:**

~~~ts
// valaxy.config.ts
import { defineConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
~~~

**配置示例:**

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
    //   primary: '#e67474',
    // },

    prefixName: 'かなしいの',
    siteName: '心悦',

    homeTitle: 'Hello, sakura',
    homeMotto: 'You got to put the past behind you before you can move on.',

    favicon: false, // 导航栏图标

    banner: {
      // 壁纸支持图片及视频
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg'
      ],
      // 背景样式选项:
      // - '': 无特效，显示原图
      // - 'filter-dim': 阴影效果
      // - 'filter-grid': 横条效果
      // - 'filter-dot': 点点效果
      backgroundStyle: 'filter-dot',
    },

    // 导航栏
    nav: [
      {
        text: 'GitHub',
        icon: 'i-ri-github-fill',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
      {
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: '/atom.xml',
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

    // 页脚配置
    footer: {
      since: 2024,

      icon: {
        img: '/favicon.ico',
        animated: true,
        url: 'https://wrxinyue.org',
        title: 'WRXinYue',
      },
    },
  },
})
~~~

**更新主题：**

~~~bash
pnpm up valaxy-theme-sakura --latest
# npm update valaxy-theme-sakura --latest
~~~
