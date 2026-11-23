---
title: frontmatter config
title_zh-CN: frontmatter 配置
toc: true
categories:
  - getting-started
top: 100
---

frontmatter 支持基于页面的配置。在每个 markdown 文件中，可以使用 frontmatter 配置来覆盖站点级别或主题级别的配置选项。此外，还有一些配置选项只能在 frontmatter 中定义。

示例用法：

```md
---
title: Docs with VitePress
---
```

| 属性名    | 类型                           | 默认值      | 说明                                            |
| --------- | ------------------------------ | ----------- | ----------------------------------------------- |
| icon      | `string`                       | `undefined` | ---                                             |
| title     | `string`                       | `undefined` | ---                                             |
| subTitle  | `string`                       | `undefined` | ---                                             |
| cover     | `string`                       | `undefined` | ---                                             |
| author    | `string`                       | `undefined` | ---                                             |
| date      | `string` \| `number` \| `Date` | `undefined` | ---                                             |
| toc       | `boolean`                      | `true`      | 是否显示目录                                    |
| sponsor   | `boolean`                      | `undefined` | 是否开启赞助，如果开启则显示`SakuraSponsor`组件 |
| copyright | `boolean`                      | `undefined` | 是否在**本页**显示文章底部版权信息              |
