---
title: Theming
title_zh-CN: 主题化
toc: true
categories:
  - styles
---

## 主题化 <SupTag>0.6.0</SupTag> {lang="zh-CN"}

## Theming <SupTag>0.6.0</SupTag> {lang="en"}

::: zh-CN
`valaxy-theme-sakura` 与其他一些博客主题不同, 它不强制使用某种样式, 而且有多种风格模式, 主题样式与主题组件分离。主题组件一般会保持简化状态，之后可以从各种预先设计的主题样式文件中进行选择或开发您自己的主题
:::

::: en
`valaxy-theme-sakura` differs from some other blog themes in that it does not enforce a particular style. Instead, it offers multiple styled modes, separating theme styles from theme components. The theme components are generally kept in a simplified state, allowing you to choose from various pre-designed theme style files or develop your own theme later.
:::

## 配置 {lang="zh-CN"}

## Configuration {lang="en"}

### 全部导入 {lang="zh-CN"}

### Import all {lang="en"}

::: zh-CN
在 `styles` 目录下新建 `index.scss` 文件，填入喜欢的样式文件：
:::

::: en
Create a new `index.scss` file in the `styles` directory and fill in your preferred style definitions:
:::

::: code-group

```scss [sakura]
@use 'valaxy-theme-sakura/styles/themes/sakura/index.scss' as *;
```

:::

### 拆分导入 <SupTag>0.6.2</SupTag> {lang="zh-CN"}

### Importing Parts <SupTag>0.6.2</SupTag> {lang="en"}

::: zh-CN
如果您只想要主题文件部分效果，可以进行拆分导入:
:::

::: en
If you only want certain aspects of the theme files, you can import them separately:
:::

::: code-group

```scss [sakura]
@use 'valaxy-theme-sakura/styles/themes/sakura/css-vars.scss' as *;
@use 'valaxy-theme-sakura/styles/themes/sakura/prose.scss' as *;
@use 'valaxy-theme-sakura/styles/themes/sakura/components.scss' as *;
@use 'valaxy-theme-sakura/styles/themes/sakura/animation.scss' as *;
```

:::

::: zh-CN

- **CSS变量 (`css-vars.scss`)**: 包含主题配色，文字配色，高度定义等
- **文章排版 (`prose.scss`)**: 包含文章的基本样式，包括标题、段落、列表等
- **组件样式 (`components.scss`)**: 包含美化部分组件的样式
- **动画 (`animation.scss`)**: 包含主题动画效果

:::

::: en

- **CSS Variables (`css-vars.scss`)**: Contains theme colors, text colors, height definitions, etc.
- **Prose Styles (`prose.scss`)**: Contains basic styles for articles, including titles, paragraphs, lists, etc.
- **Component Styles (`components.scss`)**: Includes styles for beautifying various components.
- **Animation Styles (`animation.scss`)**: Includes theme animation effects.

:::
