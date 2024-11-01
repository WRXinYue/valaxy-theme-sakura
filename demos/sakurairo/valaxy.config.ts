import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'
import pkg from 'valaxy-theme-sakura/package.json'
import { baseConfig } from '@valaxy-theme-sakura/sakurairo'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',
  devtools: true,

  themeConfig: baseConfig({
    colors: {
      primary: '#ff4e6a',
    },

    banner: {
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://w.wallhaven.cc/full/gp/wallhaven-gpeolq.jpg',
        'https://w.wallhaven.cc/full/7p/wallhaven-7pz66y.jpg',
        // 'https://w.wallhaven.cc/full/x6/wallhaven-x6mg8d.jpg'
      ],
      style: 'filter-dot',

      typewriter: true,
      enableHitokoto: true,
    },

    pagination: {
      animation: true,
      infiniteScrollOptions: {
        preload: true,
      },
    },

    article: {
      navigationMerge: true,
    },

    scrollToTop: true,

    navbar: [
      {
        icon: 'i-line-md-home-md-twotone',
        locale: 'menu.home',
        link: '/',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-line-md-folder-twotone',
        locale: 'menu.categories',
        link: '/categories',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-line-md-folder-plus-twotone',
        locale: 'menu.archives',
        link: '/archives',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-line-md-hash-small',
        locale: 'menu.tags',
        link: '/tags',
        animated: 'animation-hvr-grow',
      },
      {
        icon: 'i-line-md-hash-small',
        locale: 'menu.anime',
        link: '/anime',
        animated: 'animation-hvr-grow',
      },
      {
        text: pkg.author.name,
        icon: 'i-line-md-hazard-lights-filled',
        link: pkg.author.url,
        target: '_blank',
        animated: 'animation-hvr-icon-bounce',
      },
      {
        text: '友情链接',
        icon: 'i-line-md-link',
        link: '/links',
        animated: 'animation-hvr-icon-buzz-out',
        children: [
          {
            text: 'GitHub',
            icon: 'i-line-md-github-twotone',
            link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
          },
          {
            text: 'Discord',
            icon: 'i-line-md-discord-twotone',
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
        icon: 'i-line-md-rss',
        link: '/atom.xml',
        target: '_blank',
        animated: 'animation-hvr-icon-up',
      },
    ],
    navbarOptions: {
      title: ['さくら', 'の', '夢'],
      invert: true,
      autoHide: true,
    },

    sidebar: [
      {
        text: '🌈',
        locale: 'menu.home',
        link: '/',
      },
      {
        text: '🗂️',
        locale: 'menu.archives',
        link: '/archives/',
      },
      {
        text: '📂',
        locale: 'menu.categories',
        link: '/categories/',
      },
      {
        text: '🏷️',
        locale: 'menu.tags',
        link: '/tags/',
      },
      {
        text: '🎯 清单',

        children: [
          {
            text: '电影 🎞️',
            link: '/movie',
          },
          {
            text: '番剧 🍨',
            link: '/anime',
          },
          {
            text: '游戏 🎮',
            link: '/game',
          },
          {
            text: '歌单 🎵',
            link: '/music',
          },
        ],
      },
      {
        text: '📝 留言板',
      },
      {
        text: '🍻 朋友圈',
      },
      {
        text: '❤️ 打赏',
      },
      {
        text: '📌',
        locale: 'menu.about',
      },
    ],
    sidebarOptions: {
      position: 'left',
    },

    tags: {
      rainbow: true,
    },

    footer: {
      since: 2024,

      icon: {
        img: '/favicon-16x16.ico',
        animated: true,
        url: 'https://wrxinyue.org',
        title: 'WRXinYue',
      },
    },

    toggleThemeIcon: {
      lightIcon: 'i-line-md-moon-alt-to-sunny-outline-loop-transition',
      darkIcon: 'i-line-md-sunny-outline-to-moon-loop-transition',
    },
  }),
})
