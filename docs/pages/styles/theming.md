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

::: zh-CN
在 `styles` 目录下新建 `index.scss` 文件，填入喜欢的样式文件：
:::

::: en
Create a new `index.scss` file in the `styles` directory and fill in your preferred style definitions:
:::

::: code-group

```scss [sakura]
@use "valaxy-theme-sakura/styles/themes/sakura/index.scss" as *;
```

```scss [ocean 🚧]
@use "valaxy-theme-sakura/styles/themes/ocean/index.scss" as *;
```

:::
