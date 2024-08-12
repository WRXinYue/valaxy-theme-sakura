---
title: LinksThemeYun
title_zh-CN: LinksThemeYun
toc: true
categories:
  - components-themes
---

## LinksThemeYun <SupTag>0.6.0</SupTag>

在原来 [valaxy-theme-yun](https://github.com/YunYouJun/valaxy/tree/main/packages/valaxy-theme-yun) YunLinks组件基础上进行扩展

## 基础使用

```md
---
links:
  - url: https://www.yunyoujun.cn
    avatar: https://www.yunyoujun.cn/images/avatar.jpg
    name: 云游君
    blog: 云游君的小站
    desc: 希望能成为一个有趣的人。
    email: me@yunyoujun.cn
    color: "#0078e7"
  - url: https://valaxy.site
    avatar: https://valaxy.site/favicon.svg
    name: Valaxy Org
    blog: Valaxy Site
    desc: 下一代静态博客框架
    email: i@valaxy.site
    color: "#6058d9"
---
```

## 使用 RSS

自动从rss获取站点信息，如果想覆盖站点其中一条参数，添加其对应参数即可

```md
---
links:
  - rss: https://www.yunyoujun.cn/atom.xml
  - rss: https://sakura.wrxinyue.org/atom.xml
    blog: 示例站点
  - rss: https://sakura.valaxy.site/atom.xml
---
```

## 使用 JSON

以小云站点为示例

```md
---
links: https://friends.yunyoujun.cn/links.json
---
```

## 参考

以主题示例为例

```md
---
layout: links
title: 友联板
keywords: 链接
description: 我的小伙伴们
links:
  - rss: https://www.yunyoujun.cn/atom.xml
  - rss: https://sakura.wrxinyue.org/atom.xml
  - rss: https://sakura.valaxy.site/atom.xml
random: true
comment: false
---
```

### Attributes

| 属性名   | 类型                   | 默认值      | 说明                                                             |
| -------- | ---------------------- | ----------- | ---------------------------------------------------------------- |
| links    | `string \| LinkType[]` | `undefined` | 友情链接信息（可以是 YAML 数组形式，也可以是一个 JSON 文件链接） |
| random   | `boolean`              | `false`     | 是否随机展示                                                     |
| errorImg | `string`               | `undefined` | 图片加载失败时的图片链接, 未填写默认使用主题404图片              |

### Frontmatter

同 [Attributes](#attributes)
