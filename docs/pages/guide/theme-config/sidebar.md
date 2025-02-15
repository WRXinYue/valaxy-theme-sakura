---
title: Sidebar
title_zh-CN: 侧边栏
toc: true
categories:
  - theme-config
top: 500
---

`sidebar` 侧边栏与 `navbar` 导航栏功能相似，在未自定义侧边栏的情况下，主题会自动使用导航栏的配置。

---

## ThemeConfig

### **SidebarItem**

用于定义侧边栏的每个条目（菜单项）

| 属性名          | 类型               | 默认值 | 说明                                     |
| --------------- | ------------------ | ------ | ---------------------------------------- |
| `text`          | `string`           | ---    | 侧边栏文本标签                           |
| `locale`        | `string \| number` | ---    | 多语言（i18n）支持，指定对应的语言或地区 |
| `icon`          | `string`           | ---    | 侧边栏图标，可以是图标类名或路径         |
| `link`          | `string`           | ---    | 侧边栏项的链接地址                       |
| `items`         | `SidebarItem[]`    | ---    | 侧边栏子列表（子菜单项）                 |
| `collapsed`     | `boolean`          | ---    | 是否可折叠，`true` 表示默认折叠          |
| `base`          | `string`           | ---    | 侧边栏子列表的基础路径                   |
| `docFooterText` | `string`           | ---    | 自定义出现在“上一页/下一页”页脚的文本    |
| `rel`           | `string`           | ---    | 链接的 `rel` 属性（如 `nofollow` 等）    |
| `target`        | `string`           | ---    | 链接的 `target` 属性（如 `_blank`）      |

---

### **SidebarOptions**

用于配置整个侧边栏的行为

| 属性名            | 类型                               | 默认值      | 说明                                                                                                                                                           |
| ----------------- | ---------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`        | `'left' \| 'right'`                | `'left'`    | 侧边栏显示的位置，`left` 在左侧，`right` 在右侧                                                                                                                |
| `offset`          | `boolean`                          | `true`      | 侧边栏开启时是否对布局进行偏移                                                                                                                                 |
| `initialState`    | `boolean`                          | `false`     | 侧边栏的默认状态，`true` 为打开，`false` 为关闭                                                                                                                |
| `persistence`     | `'session' \| 'permanent' \| null` | `'session'` | 侧边栏状态持久化方式：<br>- `'session'`：存储在会话中，关闭页面后恢复默认状态<br>- `'permanent'`：持久存储，页面刷新后仍保留状态<br>- `null`：不进行状态持久化 |
| `enableOnDesktop` | `boolean`                          | `false`     | 是否在 PC 端启用侧边栏                                                                                                                                         |
| `showCounts`      | `boolean`                          | `false`     | 是否在侧边栏中显示计数器                                                                                                                                       |
