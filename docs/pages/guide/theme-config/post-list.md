---
title: PostList
title_zh-CN: 文章列表
toc: true
categories:
  - theme-config
---

## 标题

| 属性名          | 类型     | 默认值       | 说明               |
| --------------- | -------- | ------------ | ------------------ |
| `postList.text` | `string` | `'文章列表'` | 文章列表的标题文本 |

## 卡片部分

本主题支持基于 Tailwind CSS 断点系统的响应式参数配置，使文章列表在不同屏幕尺寸下显示不同的列数。

### ThemeConfig

| 属性名                     | 类型                   | 默认值 | 说明                                                                                                               |
| -------------------------- | ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `postList.isImageReversed` | `boolean`              |        | 图片位置反转                                                                                                       |
| `postList.defaultImage`    | `string` \| `string[]` | ---    | 设置文章列表的默认图片。可以是一个图片 URL 字符串，也可以是一个图片 URL 数组。如果未提供图片，则使用默认的占位图标 |

| 属性名                       | 类型                            | 默认值 | 说明               |
| ---------------------------- | ------------------------------- | ------ | ------------------ |
| `ui.postList.icon`           | `string`                        | ---    | 图标的 URL 或类名  |
| `ui.postList.image`          | `Partial<SakuraImageCardProps>` | ---    | 文章列表图片配置   |
| `ui.postList.responsive.sm`  | `number`                        | ---    | 小屏幕时的列数     |
| `ui.postList.responsive.md`  | `number`                        | ---    | 中等屏幕时的列数   |
| `ui.postList.responsive.lg`  | `number`                        | ---    | 大屏幕时的列数     |
| `ui.postList.responsive.xl`  | `number`                        | ---    | 超大屏幕时的列数   |
| `ui.postList.responsive.2xl` | `number`                        | ---    | 超超大屏幕时的列数 |

### 自定义大屏布局

示例 1：在 `xl`（1280px）屏幕上显示 2 列，在 `2xl`（1536px）屏幕上显示 3 列。

```ts
themeConfig: {
  ui: {
    postList: {
      responsive: {
        xl: 2,
        '2xl': 3
      }
    }
  }
}
```

<SakuraPostListPG :responsive='{"xl": 2, "2xl": 3}' />

示例 2：在 `xl`（1280px）屏幕上显示 3 列，在 `2xl`（1536px）屏幕上显示 4 列。

```ts
themeConfig: {
  ui: {
    postList: {
      responsive: {
        xl: 3,
        '2xl': 4
      }
    }
  }
}
```

<SakuraPostListPG :responsive='{"xl": 3, "2xl": 4}' />

### 断点对应关系

| 断点 | 最小宽度 | 典型设备     |
| ---- | -------- | ------------ |
| sm   | 640px    | 大屏手机     |
| md   | 768px    | 平板         |
| lg   | 1024px   | 笔记本电脑   |
| xl   | 1280px   | 台式显示器   |
| 2xl  | 1536px   | 大尺寸显示器 |

### 注意事项

1. 未指定的断点将继承更小断点的配置。
2. 移动端（<640px）默认单列显示。
3. 自定义断点时，建议至少配置 `xl` 和 `2xl` 断点，以获得最佳显示效果。
4. 列数建议不超过 4 列，以保证良好的阅读体验。
