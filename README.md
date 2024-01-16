![Preview](https://wrxinyue-images.s3.bitiful.net/2024-01-16_19-31.png)

<h2 align="center">Valaxy Theme Sakura</h2>
<pre align="center">
🧪 正在积极开发中，此版本不代表正式结果...
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
</p>


### Usage

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

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<ThemeUserConfig>({
  // site config see site.config.ts

  theme: 'sakura',

  themeConfig: {
    // colors: {
    //   primary: 'red',
    // },

    prefixName: 'vitepress-theme-',
    siteName: 'sakura',

    nav: [
      {
        text: 'GitHub',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
      {
        text: 'RSS',
        link: '/atom.xml',
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/sGe4U4p4CK',
      },
      {
        text: 'Valaxy →',
        link: 'https://github.com/YunYouJun/valaxy',
      },
    ],

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

  unocss: { safelist },
})
~~~

**更新主题：**
~~~bash
pnpm up valaxy-theme-sakura
# npm update valaxy-theme-sakura
~~~

示例: <a href="https://sakura.wrxinyue.org/">Live Demo</a>
