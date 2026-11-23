---
title: Sidebar
title_zh-CN: 侧边栏
toc: true
categories:
  - theme-config
top: 500
---

# Sidebar 侧边栏

`sidebar` 侧边栏与 `navbar` 导航栏功能相似，在未自定义侧边栏的情况下，主题会自动使用导航栏的配置。侧边栏提供了一种组织和导航网站内容的方式，特别适合于文档类型的网站。

## 基本配置

在 `valaxy.config.ts` 中，你可以通过 `themeConfig.sidebar` 来配置侧边栏：

```ts
export default defineValaxyConfig({
  themeConfig: {
    sidebar: [
      {
        text: '指南',
        icon: 'i-fa6-solid:book',
        items: [
          { text: '介绍', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '主题配置',
        icon: 'i-fa6-solid:palette',
        collapsed: false,
        items: [
          { text: '基础配置', link: '/guide/theme-config/basics' },
          { text: '侧边栏', link: '/guide/theme-config/sidebar' }
        ]
      }
    ],
    sidebarOptions: {
      position: 'left',
      enableOnDesktop: true
    }
  }
})
```

## 侧边栏项配置

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
| `docFooterText` | `string`           | ---    | 自定义出现在"上一页/下一页"页脚的文本    |
| `rel`           | `string`           | ---    | 链接的 `rel` 属性（如 `nofollow` 等）    |
| `target`        | `string`           | ---    | 链接的 `target` 属性（如 `_blank`）      |

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

## 侧边栏使用示例

### 基础侧边栏

最简单的侧边栏配置，包含几个链接：

```ts
sidebar: [
  { text: '首页', link: '/' },
  { text: '关于', link: '/about' },
  { text: '联系我们', link: '/contact' }
]
```

### 带图标的侧边栏

为侧边栏项添加图标，使其更加直观：

```ts
sidebar: [
  { text: '首页', icon: 'i-fa6-solid:home', link: '/' },
  { text: '关于', icon: 'i-fa6-solid:info-circle', link: '/about' },
  { text: '联系我们', icon: 'i-fa6-solid:envelope', link: '/contact' }
]
```

### 分组侧边栏

将相关内容分组，使导航更加清晰：

```ts
sidebar: [
  {
    text: '指南',
    icon: 'i-fa6-solid:book',
    items: [
      { text: '介绍', link: '/guide/introduction' },
      { text: '安装', link: '/guide/installation' },
      { text: '配置', link: '/guide/configuration' }
    ]
  },
  {
    text: '组件',
    icon: 'i-fa6-solid:puzzle-piece',
    items: [
      { text: '按钮', link: '/components/button' },
      { text: '卡片', link: '/components/card' },
      { text: '表单', link: '/components/form' }
    ]
  }
]
```

### 可折叠的侧边栏

使用 `collapsed` 属性创建可折叠的侧边栏组：

```ts
sidebar: [
  {
    text: '基础',
    icon: 'i-fa6-solid:layer-group',
    collapsed: true, // 默认折叠
    items: [
      { text: '快速开始', link: '/basics/getting-started' },
      { text: '目录结构', link: '/basics/directory-structure' }
    ]
  },
  {
    text: '高级',
    icon: 'i-fa6-solid:rocket',
    collapsed: false, // 默认展开
    items: [
      { text: '自定义主题', link: '/advanced/custom-theme' },
      { text: '插件开发', link: '/advanced/plugin-development' }
    ]
  }
]
```

### 使用基础路径

使用 `base` 属性简化子项的链接路径：

```ts
sidebar: [
  {
    text: '文档',
    icon: 'i-fa6-solid:file-lines',
    base: '/docs/',
    items: [
      // 实际链接为 /docs/introduction
      { text: '介绍', link: 'introduction' },
      // 实际链接为 /docs/installation
      { text: '安装', link: 'installation' }
    ]
  }
]
```

## 侧边栏选项配置示例

### 右侧侧边栏

将侧边栏放置在右侧：

```ts
sidebarOptions: {
  position: 'right'
}
```

### 在桌面端启用侧边栏

默认情况下，侧边栏在桌面端不显示，可以通过以下配置启用：

```ts
sidebarOptions: {
  enableOnDesktop: true
}
```

### 自定义侧边栏持久化

配置侧边栏状态的持久化方式：

```ts
sidebarOptions: {
  // 持久保存侧边栏状态，即使页面刷新也会保持
  persistence: 'permanent',

  // 或者禁用持久化
  // persistence: null
}
```

### 显示计数器

在侧边栏项目旁显示计数器：

```ts
sidebarOptions: {
  showCounts: true
}
```

## 响应式行为

侧边栏在不同设备上的表现：

- **移动设备**：默认以抽屉形式显示，点击汉堡菜单按钮打开
- **桌面设备**：默认不显示，除非设置 `enableOnDesktop: true`

## 与导航栏的关系

如果没有配置 `sidebar`，主题会自动使用 `navbar` 的配置作为侧边栏内容。这在简单网站中非常有用，可以避免重复配置。

## 自动生成侧边栏

对于文档类型的网站，你可能希望根据目录结构自动生成侧边栏。虽然 Valaxy 主题本身不直接支持这个功能，但你可以通过编程方式实现：

```ts
import fs from 'node:fs'
import path from 'node:path'
import { defineValaxyConfig } from 'valaxy'

// 简单的自动生成侧边栏函数
function generateSidebar(docsDir) {
  // 实现逻辑...
  return [
    // 自动生成的侧边栏配置
  ]
}

export default defineValaxyConfig({
  themeConfig: {
    sidebar: generateSidebar('docs/guide')
  }
})
```

## 最佳实践

1. **保持层级清晰**：避免过多的嵌套层级，通常不超过3层
2. **使用图标**：为主要分类添加图标，提高可识别性
3. **合理分组**：将相关内容放在同一组中，便于用户查找
4. **考虑移动设备**：确保侧边栏在移动设备上也能良好工作
5. **使用折叠功能**：对于大型文档，使用折叠功能减少初始加载时的视觉复杂度
