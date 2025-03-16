---
title: Pagination
title_zh-CN: 分页
toc: true
categories:
  - theme-config
top: 500
---

# Pagination 分页

分页功能用于在文章列表、归档页面等地方展示多页内容。Sakura 主题提供了多种分页方式，包括传统的数字分页和现代的无限滚动分页，让你可以根据自己的喜好选择合适的分页方式。

## 基本配置

在 `valaxy.config.ts` 中，你可以通过 `themeConfig.pagination` 来配置分页：

```ts
export default defineValaxyConfig({
  themeConfig: {
    pagination: {
      type: 'infinite-scroll',
      animation: true,
      infiniteScrollOptions: {
        preload: true,
      },
    }
  }
})
```

## 分页配置项

### **PaginationConfig**

| 属性名                  | 类型                              | 默认值              | 说明                                                                      |
| ----------------------- | --------------------------------- | ------------------- | ------------------------------------------------------------------------- |
| `type`                  | `'infinite-scroll' \| 'numbered'` | `'infinite-scroll'` | 分页类型，可选 `'infinite-scroll'`（无限滚动）或 `'numbered'`（数字分页） |
| `animation`             | `boolean`                         | `true`              | 是否启用分页切换动画                                                      |
| `infiniteScrollOptions` | `InfiniteScrollOptions`           | ---                 | 无限滚动选项，详见下方 InfiniteScrollOptions                              |

### **InfiniteScrollOptions**

| 属性名     | 类型      | 默认值 | 说明                                                               |
| ---------- | --------- | ------ | ------------------------------------------------------------------ |
| `preload`  | `boolean` | `true` | 是否预加载下一页内容，启用后会在接近页面底部时自动加载下一页内容   |
| `distance` | `number`  | `100`  | 触发预加载的距离（像素），表示距离页面底部多少像素时开始加载下一页 |
| `initial`  | `number`  | `5`    | 初始加载的文章数量                                                 |
| `step`     | `number`  | `5`    | 每次加载的文章数量                                                 |

## 使用示例

### 无限滚动分页（默认）

无限滚动分页是一种现代的分页方式，用户可以通过滚动页面来加载更多内容，无需点击分页按钮：

```ts
pagination: {
  type: 'infinite-scroll',
  animation: true,
  infiniteScrollOptions: {
    preload: true,
    distance: 200, // 提前 200px 开始加载
    initial: 10,   // 初始加载 10 篇文章
    step: 5        // 每次加载 5 篇文章
  }
}
```

### 传统数字分页

如果你更喜欢传统的分页方式，可以使用数字分页：

```ts
pagination: {
  type: 'numbered',
  animation: true
}
```

### 禁用分页动画

如果你不需要分页切换动画，可以将 `animation` 设置为 `false`：

```ts
pagination: {
  type: 'infinite-scroll',
  animation: false,
  infiniteScrollOptions: {
    preload: true
  }
}
```

## 自定义分页样式

Sakura 主题的分页样式可以通过 CSS 变量进行自定义。你可以在你的 `styles/index.scss` 文件中添加以下代码来修改分页的样式：

```scss
:root {
  // 分页按钮背景色
  --sakura-pagination-bg: rgba(255, 255, 255, 0.8);

  // 分页按钮文字颜色
  --sakura-pagination-text: #666;

  // 分页按钮悬停背景色
  --sakura-pagination-hover-bg: #fe9500;

  // 分页按钮悬停文字颜色
  --sakura-pagination-hover-text: #fff;

  // 当前页按钮背景色
  --sakura-pagination-active-bg: #fe9500;

  // 当前页按钮文字颜色
  --sakura-pagination-active-text: #fff;
}

html.dark {
  // 暗色模式下的分页按钮背景色
  --sakura-pagination-bg: rgba(30, 30, 32, 0.8);

  // 暗色模式下的分页按钮文字颜色
  --sakura-pagination-text: #aaa;
}
```
