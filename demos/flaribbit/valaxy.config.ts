import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    navbar: [
      { text: '首页', link: '/', icon: 'i-ion:home' },
      { text: '标签', link: '/tags/', icon: 'i-ion:md-pricetag' },
      { text: '关于', link: '/', icon: 'i-ion:leaf' },
    ],
    banner: {
      enable: true,
      urls: ['https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/optimize/60651947_p0.webp'],
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on. ',
      style: '',
      overlayBar: true,
      cloud: {
        enable: true,
      },
    },
  },
})
