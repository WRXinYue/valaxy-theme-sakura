---
title: home
title_zh-CN: 主页
toc: true
categories:
  - theme-config
top: 900
---

主页就是博客的首页

## Hero 部分

Hero 当中可以配置博客首页大屏壁纸或者标题之类的

<SakuraHeroPG />

### ThemeConfig

| 名称                    | 类型                                               | 默认值                                                         | 说明                                                                                                                                                                                                       |
| ----------------------- | -------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                   | `string`                                           | `'Hello, sakura'`                                              | 首页标题                                                                                                                                                                                                   |
| motto                   | `string`                                           | `'You got to put the past behind you before you can move on.'` | 首页标语 (写下愿景也很不错呀)                                                                                                                                                                              |
| urls                    | `string[] \| string`                               | `undefined`                                                    | 网站头部背景媒体列表，支持图片、直链视频和 YouTube 链接；视频作为背景时静音自动播放，点击播放按钮播放当前视频                                                                                                |
| style                   | 'dim' \| 'dot' \| 'scanline' \| 'glitch' \| 'grid' | `'dim'`                                                        | 背景叠加样式，可选值为`'dim'`（昏暗过滤效果）、`'dot'`（点状过滤效果）、<br class="<md:hidden" />`'scanline'`（扫描线效果）、`'glitch'`（故障艺术效果）、<br class="<md:hidden" />`'grid'`（网格过滤效果） |
| randomUrls              | `boolean`                                          | `false`                                                        | 是否随机 urls，开启此项切换 url 也会进行随机                                                                                                                                                               |
| fixedImg                | `boolean`                                          | `false`                                                        | 是否固定背景图片                                                                                                                                                                                           |
| typewriter              | `boolean`                                          | `false`                                                        | 是否启用打字机组件                                                                                                                                                                                         |
| enableHitokoto          | `boolean`                                          | `false`                                                        | 启用一言，如果启用则 `motto` 显示为一言                                                                                                                                                                    |
| hitokoto                | `HitokotoOptions`                                  | `undefined`                                                    | 一言的配置选项                                                                                                                                                                                             |
| waveTheme               | `'fish' \| 'ripple'                                | `undefined`                                                    | 背景波纹主题                                                                                                                                                                                               |
| disablePictureInPicture | `boolean`                                          | `undefined`                                                    | 是否禁用画中画功能                                                                                                                                                                                         |
| socials                 | `Partial<HeroSocialLink[]>`                        | `[]`                                                           | 社交链接                                                                                                                                                                                                   |
| socialStyle             | `'merge' \| 'separate' \| 'single'`                | `'merge'`                                                      | 社交链接样式                                                                                                                                                                                               |

### 配置示例

```ts
// valaxy.config.ts
export default defineValaxyConfig<ThemeUserConfig>({
  // ...
  themeConfig: {
    // ...
    hero: {
      title: 'HI, SAKURA!',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-858k3j.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-3l2vm3.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-3z9dz9.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-rrdgp1.jpg',
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper-2025%2Fwallhaven-zyxq6j.jpg',
        // 视频背景示例
        'https://valaxy-theme-sakura.s3.bitiful.net/wallpaper/yae-miko-sunset-sakura-genshin-impact-moewalls-com.mp4',
        // YouTube 背景示例（静音自动播放，点击播放按钮切换为有声播放）
        'https://www.youtube.com/watch?v=OWDcn7hl16A',
      ],
      randomUrls: true,
      style: 'scanline', // 使用扫描线效果
      fixedImg: true, // 固定背景图片
      typewriter: true, // 启用打字机效果
      enableHitokoto: true, // 启用一言
      waveTheme: 'fish', // 设置背景波纹主题
    },
    // ...
  }
})
```

## 向下滚动按钮

在主页添加向下滚动按钮，引导用户向下浏览内容。

### ThemeConfig

| 名称       | 类型                  | 默认值              | 说明                 |
| ---------- | --------------------- | ------------------- | -------------------- |
| scrollDown | `{ enable: boolean }` | `{ enable: false }` | 是否启用向下滚动按钮 |

### UI 配置示例

可以通过 ui.scrollDown.icon 自定义图标：

```ts
// valaxy.config.ts
export default defineValaxyConfig<ThemeUserConfig>({
  // ...
  themeConfig: {
    // ...
    ui: {
      // ...
      scrollDown: {
        icon: 'i-fa-chevron-down', // 使用 Font Awesome 的向下箭头图标
      },
    },
    scrollDown: {
      enable: true, // 启用向下滚动按钮
    },
    // ...
  }
})
```

## 公告配置

可以在主页显示公告信息。

### ThemeConfig

| 名称   | 类型                  | 默认值      | 说明                         |
| ------ | --------------------- | ----------- | ---------------------------- |
| notice | `{ message: string }` | `undefined` | 公告配置，message 为公告内容 |

### 配置示例

```ts
// valaxy.config.ts
export default defineValaxyConfig<ThemeUserConfig>({
  // ...
  themeConfig: {
    // ...
    notice: {
      message: '<b>这是一个公告信息, 主题开源地址请见: <a href="https://github.com/WRXinYue/valaxy-theme-sakura">https://github.com/WRXinYue/valaxy-theme-sakura</a></br>',
    },
    // ...
  }
})
```

公告支持 HTML 标签，可以添加加粗、链接等样式。

## 卡片列表 (PostList)

详情请见 [PostList](/guide/theme-config/post-list)
