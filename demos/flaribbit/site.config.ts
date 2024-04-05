import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://valaxy.site/',
  lang: 'zh-CN',
  title: 'Valaxy Theme Sakura',
  author: {
    name: 'WRXinYue',
  },
  description: 'Valaxy Theme Yun Preview.',
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/flaribbit',
      icon: 'i-ri-github-line',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com',
      icon: 'i-ri-twitter-line',
    },
    {
      name: '微博',
      link: 'https://weibo.com',
      icon: 'i-ri-weibo-line',
    },
  ],

  search: {
    enable: false,
  },

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
