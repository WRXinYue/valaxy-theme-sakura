---
title:
  en: home
  zh-CN: 主页
toc: true
categories:
  - theme-config
top: 900
---

首页由首屏 Hero、文章列表和分页组成。下表列出了每个区域读取的配置，方便从页面上的元素找到对应字段。

| 页面元素 | 配置位置 |
| --- | --- |
| 大标题、背景图片或视频、叠加效果、波浪 | `valaxy.config.ts` → `themeConfig.hero` |
| 公告文字与图标 | `themeConfig.notice.message`、`themeConfig.ui.notice.icon` |
| 站点名称、站点图标、社交链接 | `site.config.ts` → `title`、`favicon`、`social`。Hero 左上角的图标还受 `themeConfig.navbarOptions.favicon` 控制 |
| 底部菜单、搜索和明暗切换等工具 | [导航配置](/posts/guide/theme-config/nav)中的 `themeConfig.navbar` 和 `themeConfig.navbarOptions` |
| 文章卡片、响应式列数 | [文章列表配置](/posts/guide/theme-config/post-list)中的 `themeConfig.postList` |
| 翻页和无限滚动 | [分页配置](/posts/guide/theme-config/pagination)中的 `themeConfig.pagination` |

## 分类顺序

在 `valaxy.config.ts` 的 `themeConfig.postList` 中设置 `categoryOrder: ['getting-started', 'theme-config']`，就能把「快速入门」和「主题配置」按顺序排在「全部」后面。数组使用 frontmatter 中的原始分类名，未列出的分类沿用原有顺序。

## Hero 部分

编辑器里的配置可直接放入 `valaxy.config.ts` 的 `themeConfig` 中。试着修改 `hero.title` 或 `notice.message`，清空公告文字可以隐藏公告。导航、站点名称和社交链接沿用当前站点配置。

<SakuraHeroPG />

### ThemeConfig

| 名称                    | 类型                                               | 默认值                                                         | 说明                                                                                                                                                                                                       |
| ----------------------- | -------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                   | `string`                                           | `'Hello, sakura'`                                              | 首页标题                                                                                                                                                                                                   |
| urls                    | `string[] \| string`                               | `undefined`                                                    | 网站头部背景媒体列表，支持图片、直链视频和 YouTube 链接；视频作为背景时静音自动播放，点击播放按钮播放当前视频                                                                                                |
| style                   | 'dim' \| 'dot' \| 'scanline' \| 'glitch' \| 'grid' | `'dim'`                                                        | 背景叠加样式，可选值为`'dim'`（昏暗过滤效果）、`'dot'`（点状过滤效果）、<br class="<md:hidden" />`'scanline'`（扫描线效果）、`'glitch'`（故障艺术效果）、<br class="<md:hidden" />`'grid'`（网格过滤效果） |
| randomUrls              | `boolean`                                          | `false`                                                        | 是否随机 urls，开启此项切换 url 也会进行随机                                                                                                                                                               |
| fixedImg                | `boolean`                                          | `false`                                                        | 是否固定背景图片                                                                                                                                                                                           |
| waveTheme               | `'fish' \| 'ripple'                                | `undefined`                                                    | 背景波纹主题                                                                                                                                                                                               |
| disablePictureInPicture | `boolean`                                          | `false`                                                        | 是否禁用视频画中画功能                                                                                                                                                                                         |

## 公告配置

可以在主页显示公告信息。

### ThemeConfig

| 名称   | 类型                  | 默认值      | 说明                         |
| ------ | --------------------- | ----------- | ---------------------------- |
| notice | `{ message: string }` | `undefined` | 公告配置，message 为公告内容 |

公告支持 HTML 标签，可以添加加粗、链接等样式。

## 卡片列表 (PostList)

详情请见 [PostList](/posts/guide/theme-config/post-list)
