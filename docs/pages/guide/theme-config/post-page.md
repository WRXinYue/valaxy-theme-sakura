---
title: Post Page
title_zh-CN: 文章页
toc: true
categories:
  - theme-config
top: 800
---

文章页是博客中展示单篇文章内容的页面，Sakura 主题提供了丰富的自定义选项来美化和增强文章页面的展示效果。

## 页面结构

Sakura 主题的文章页由以下几个主要部分组成：

1. **文章头部（Header）**：显示文章标题、封面图、发布日期等元信息
2. **文章内容（Content）**：显示文章的主体内容
3. **文章侧边栏（Sidebar）**：显示目录（TOC）等辅助导航
4. **文章底部（Footer）**：显示上一篇/下一篇文章导航、返回博客首页链接等

## 文章头部

文章头部会显示文章的标题、封面图（如果有）以及文章的元信息（发布日期、分类、标签等）。

### 封面图

在文章的 frontmatter 中设置 `cover` 属性可以为文章添加封面图：

```yaml
---
title: 文章标题
cover: /path/to/cover-image.jpg
---
```

如果文章没有指定封面图，将使用主题配置中的默认图片。

## 文章内容

文章内容区域的最大宽度为 800px，可以通过 CSS 变量进行自定义。文章内容支持 Markdown 的所有基本语法，以及代码高亮、数学公式等扩展功能。

### 版权信息

文章底部可以显示版权信息，可以在站点配置或文章 frontmatter 中控制：

```yaml
# 在文章 frontmatter 中启用或禁用版权信息
copyright: true # 或 false
```

或在站点配置中全局设置：

```ts
// valaxy.config.ts
export default defineConfig({
  license: {
    enabled: true,
    // 其他版权配置...
  }
})
```

### 赞助信息

文章底部可以显示赞助信息，可以在站点配置或文章 frontmatter 中控制：

```yaml
# 在文章 frontmatter 中启用或禁用赞助信息
sponsor: true # 或 false
```

## 文章导航

文章底部的导航部分显示上一篇和下一篇文章的链接，方便读者浏览。

### ThemeConfig

| 属性名                       | 类型      | 默认值  | 说明                                                   |
| ---------------------------- | --------- | ------- | ------------------------------------------------------ |
| `postFooter.navigationMerge` | `boolean` | `false` | 是否合并导航（将上一篇和下一篇文章导航合并为一行显示） |

当 `navigationMerge` 设置为 `true` 时，上一篇和下一篇文章的导航会合并为一行显示，更加紧凑；设置为 `false` 时，则会分为两行显示，更加清晰。

### 导航样式

文章导航支持封面图显示，如果文章有封面图，将在导航中显示；如果没有，将使用默认的背景样式。

示例配置：

```ts
themeConfig: {
  postFooter: {
    navigationMerge: true // 合并导航显示
  }
}
```

## 文章侧边栏

文章侧边栏默认显示文章目录（TOC），方便读者快速跳转到文章的不同部分。

### ThemeConfig

| 属性名         | 类型     | 默认值 | 说明                |
| -------------- | -------- | ------ | ------------------- |
| `outlineTitle` | `string` | `目录` | 文章目录（TOC）标题 |

设置 `outlineTitle` 可以自定义文章目录的标题文本，使其更符合你的博客风格。

### 目录（TOC）

目录会自动根据文章中的标题生成，可以在文章的 frontmatter 中控制是否显示目录：

```yaml
---
title: 文章标题
toc: true # 或 false
---
```

## 响应式布局

Sakura 主题的文章页面采用响应式设计，在不同屏幕尺寸下有不同的布局：

- 在移动设备上，侧边栏会隐藏，文章内容占据全屏宽度
- 在中等屏幕上（md，≥768px），侧边栏宽度为 150px，内容区域最大宽度为 800px
- 在大屏幕上（lg，≥1024px），侧边栏宽度增加到 250px，内容区域保持 800px

这些布局参数可以通过 CSS 变量进行自定义。

## 自定义样式

你可以通过 CSS 变量来自定义文章页面的样式，例如：

```css
:root {
  --sakura-page-content-max-width: 900px; /* 修改内容区域最大宽度 */
  --sakura-post-nav-height: 200px; /* 修改文章导航高度 */
}
```

## 示例配置

以下是一个完整的文章页面配置示例：

```ts
// valaxy.config.ts
export default defineConfig({
  themeConfig: {
    // 文章导航配置
    postFooter: {
      navigationMerge: true // 合并导航显示
    },

    // 目录配置
    outlineTitle: '文章目录'
  }
})
```
