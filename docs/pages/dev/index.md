---
title: Join In Development
title_zh-CN: 参与开发
toc: true
categories:
  - dev
---

# 参与开发 {lang="zh-CN"}

# Join In Development {lang="en"}

## Dev

::: zh-CN
您必须使用 [pnpm](https://pnpm.io/)。因为我们使用它的工作区功能。
:::

::: en
You must use [pnpm](https://pnpm.io/). Because we use its workspace.
:::

``` bash
git clone --recurse-submodules https://github.com/WRXinYue/valaxy-theme-sakura.git
cd valaxy-theme-sakura

pnpm i

# pnpm dev = pnpm demo
pnpm dev
```

如果您在clone没有下载子模块，则执行：

``` bash
git submodule init
git submodule update
```

## Docs

请在 vscode 安装 [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) 插件，以确保您编写的Markdown文档符合规范

``` bash
pnpm run docs
```