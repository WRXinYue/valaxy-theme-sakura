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

因为本项目是 `valaxy-theme-sakura` 包含 `valaxy-addon-live2d`仓库。所以如果您在clone本项目时没有下载子模块，则执行：

``` bash
git submodule init
git submodule update
```

> 相关链接：[git-子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)

## Docs

请在 vscode 安装 [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) 插件，以确保您编写的Markdown文档符合规范

``` bash
pnpm run docs
```
