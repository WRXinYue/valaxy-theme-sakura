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

| 名称  | 类型                                                      | 默认值                                                         | 说明                                                                                                                                                                                                   |
| ----- | --------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title | `string`                                                  | `'Hello, sakura'`                                              | 首页标题                                                                                                                                                                                               |
| motto | `string`                                                  | `'You got to put the past behind you before you can move on.'` | 首页标语 (写下愿景也很不错呀)                                                                                                                                                                          |
| urls  | `string[] \| string`                                      | `undefined`                                                    | 用于网站头部背景壁纸链接支持图片及视频,支持填入多个                                                                                                                                                    |
| style | `'\|filter-dot\|' \| 'filter-dim' \| 'filter-grid' \| ''` | `'filter-dim'`                                                 | 背景图片的过滤样式，可选值为`'filter-dot'`（点状过滤效果）、<br class="<md:hidden" />`'filter-dim'`（昏暗过滤效果）、`'filter-grid'`（网格过滤效果）<br class="<md:hidden" /> 或空字符串（无过滤效果） |
