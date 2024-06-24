---
title: Join In Development
title_zh-CN: 参与开发
toc: true
categories:
  - dev
---

# 参与开发
## 使用GitHub进行下载源码
::: code-group

```bash [https]
git clone https://github.com/WRXinYue/valaxy-theme-sakura.git
```
```bash [ssh]
git clone git@github.com:HypnosCicero/valaxy-theme-sakura.git
```

:::

## 子仓库设置
因为该仓库是包含 `valaxy-addon-live2d` 的父仓库，如果直接使用: `pnpm i`，会提示没有对应包。

所以我们需要首先初始化子仓库:
```bash
git submodule init
```

然后，在进行子仓库的更新：
```bash
git submodule update
```

## 下载对应的包
本项目使用的是 `pnpm` 进行包管理。

所以首先要确保的是，该环境是否含有 `pnpm`。
```bash
pnpm -v
```
使用该命令，如果能正确的输出版本号，则说明拥有 `pnpm` 工具。
如果没有则使用：
```bash
npm install -g pnpm
```
进行安装 `pnpm` 工具。

然后在进入到 `valaxy-theme-sakura` 项目的根目录使用：
```bash
pnpm i
```

::: warning
如果使用的是 `npm` 进行下载包，则会导致项目无法启动
:::

## 启动项目
根据 `package.json` 文件，
如果想要开发对应的主题内容请使用：
```bash
npm run dev
```

如果是要编写对应的文档则是：
```bash
pnpm run docs
```
