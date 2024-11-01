import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  mode: 'light',
  lang: 'zh-CN',
  title: 'Valaxy Theme Sakura',
  favicon: '/favicon-32x32.ico',
  url: 'https://sakura.wrxinyue.org/',
  author: {
    avatar: 'https://gravatar.com/avatar/08816a513ec0691873ac3f5883431763', // 邮箱地址转为MD5
    name: 'WRXinYue',
    status: {
      emoji: '📚',
      message: 'In a hurry',
    },
  },
  description: 'Valaxy Theme Sakura Preview.',

  comment: {
    enable: true,
  },

  encrypt: {
    enable: true,
  },

  search: {
    enable: true,
  },

  vanillaLazyload: {
    enable: true,
  },

  mediumZoom: { enable: true },

  statistics: {
    enable: true,
    readTime: {
      speed: {
        cn: 300,
        en: 200,
      },
    },
  },
})
