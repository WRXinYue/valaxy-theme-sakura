import type { Plugin } from 'vite'
import type { ResolvedValaxyOptions } from 'valaxy'
import type { ThemeConfig } from '../types'

/**
 * Default Config
 */
export const defaultThemeConfig: ThemeConfig = {
  colors: {
    primary: '#ffc0cb',
  },

  prefixName: 'かなしいの',
  siteName: '心悦',

  favicon: false,

  // TODO:

  // social  url, img PC端配置
  social: {
    github: { url: 'http://github.com/xbclub', img: 'https://cdn.jsdelivr.net/gh/xbclub/staticCDN@0.6/img/social/github.png' },
    // sina: {url: http://weibo.com/mashirozx?is_all=1, img: /img/social/sina.png},
    // wangyiyun: {url: http://weibo.com/mashirozx?is_all=1, img: /img/social/wangyiyun.png},
    // zhihu: {url: http://weibo.com/mashirozx?is_all=1, img: /img/social/zhihu.png},
    email: { url: '525255289@qq.com', img: 'https://cdn.jsdelivr.net/gh/xbclub/staticCDN@0.6/img/social/email.svg' },
    // wechat: {url: /#, qrcode: /img/custom/wechat.jpg, img: /img/social/wechat.png},
  },

  // social  url, img 移动端配置
  msocial: {
    github: { url: 'http://github.com/xbclub', fa: 'fa-github', color: 333 },
    // weibo: {url: 'http://weibo.com/mashirozx?is_all=1', fa: 'fa-weibo', color: 'dd4b39'},
    qq: { url: 'https://wpa.qq.com/msgrd?v=3&uin=525255289&site=qq&menu=yes', fa: ' fa-qq', color: ' 25c6fe' },
  },

  footer: {
    since: 2024,
    icon: {
      img: '/favicon.ico',
      animated: true,
      url: 'https://sponsors.yunyoujun.cn',
      title: 'WRXinYue',
    },

    powered: true,

    beian: {
      enable: false,
      icp: '',
    },
  },

  nav: [],
}

// write a vite plugin
// https://vitejs.dev/guide/api-plugin.html
export function themePlugin(
  options: ResolvedValaxyOptions<ThemeConfig>,
): Plugin {
  const themeConfig = options.config.themeConfig || {}

  return {
    name: 'valaxy-theme-sakura',

    config() {
      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${
                themeConfig.colors?.primary || '#0078E7'
              } !default;`,
            },
          },
        },

        valaxy: {},
      }
    },
  }
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const safelist: string[] = []

  const footerIcon = themeConfig.footer?.icon?.img
  if (footerIcon)
    safelist.push(footerIcon)

  return safelist
}
