---
title: Other Configurations
title_zh-CN: 其他配置
toc: true
categories:
  - theme-config
---

本页面列出了 Sakura 主题的其他配置选项，这些选项不属于特定的页面或功能类别。

### ThemeConfig

| 名称          | 类型     | 默认值      | 说明                   |
| ------------- | -------- | ----------- | ---------------------- |
| notFoundImage | `string` | `undefined` | 404 页面显示的图片链接 |

### 配置示例

```ts
// valaxy.config.ts
export default defineValaxyConfig<ThemeUserConfig>({
  // ...
  themeConfig: {
    // ...
    notFoundImage: 'https://example.com/404-image.png', // 自定义 404 页面图片
    // ...
  }
})
```

## 标签配置

为您的标签添加炫彩效果。

### ThemeConfig

| 名称 | 类型                                | 默认值      | 说明         |
| ---- | ----------------------------------- | ----------- | ------------ |
| tags | `{ rainbow?: boolean \| string[] }` | `undefined` | 标签配置选项 |

### 配置示例

```ts
// valaxy.config.ts
export default defineValaxyConfig<ThemeUserConfig>({
  // ...
  themeConfig: {
    // ...
    tags: {
      rainbow: true, // 为所有标签启用彩色效果
      // 或者
      // rainbow: ['JavaScript', 'TypeScript', 'Vue'], // 仅为指定标签启用彩色效果
    },
    // ...
  }
})
```

## 滚动相关配置

Sakura 主题提供了多种滚动效果和行为配置。

### ThemeConfig

| 名称            | 类型                | 默认值  | 说明                                                   |
| --------------- | ------------------- | ------- | ------------------------------------------------------ |
| scrollDamping   | `boolean`           | `false` | 是否启用滚动阻尼效果，使滚动更流畅                     |
| scrollAnimation | `boolean`           | `true`  | 是否启用滚动动画效果                                   |
| scrollIndicator | `boolean`           | `false` | 是否显示滚动指示器                                     |
| scrollLock      | `boolean`           | `true`  | 是否启用滚动锁定                                       |
| scrollToTop     | `boolean \| 'cord'` | `true`  | 是否显示"回到顶部"组件。设置为 `'cord'` 将使用绳索样式 |

### 配置示例

```ts
// valaxy.config.ts
export default defineValaxyConfig<ThemeUserConfig>({
  // ...
  themeConfig: {
    // ...
    scrollDamping: true, // 启用滚动阻尼
    scrollAnimation: true, // 启用滚动动画
    scrollIndicator: true, // 显示滚动指示器
    scrollLock: false, // 禁用滚动锁定
    scrollToTop: 'cord', // 使用绳索样式的回到顶部按钮
    // ...
  }
})
```
