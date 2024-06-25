---
title: Installation
title_zh-CN: 安装
categories:
  - getting-started
end: true
top: 100
---

## installation {lang="en"}
::: en
For users trying Valaxy for the first time, this article will guide you on how to install the valaxy-theme-sakura theme. Before proceeding, it is recommended to familiarize yourself with [valaxy](https://valaxy.site/).
:::
## 安装{lang="zh-CN"}
::: zh-CN
对于第一次尝试的valaxy的用户，可以在本篇文章会如何安装 `valaxy-theme-sakura` 主题。在此之前，建议先了解一下[valaxy](https://valaxy.site/){lang="zh-CN"}
:::
### 兼容性

要使用valaxy，您的电脑必须安装 [Node.js](https://nodejs.org/)

| 版本 | Node | valaxy |
| --- | --- | --- |
| 0.6.0 + | Node >= 18.12 | valaxy >= 0.18.5 |

### 创建 Valaxy 博客项目

::: tip
推荐使用 `pnpm` 进行安装主题。如果您的系统中尚未安装 `pnpm`，可以通过执行 `npm install -g pnpm` 命令进行安装

在创建 Valaxy 项目的过程中， `create valaxy` 命令会自动下载和安装 Valaxy，无需您手动进行安装
:::

::: code-group

```bash [pnpm]
pnpm create valaxy
```

```bash [npm]
npm create valaxy
```

```bash [yarn]
yarn create valaxy
```

:::

::: details You will be greeted with a few simple questions.
<CreateValaxyTooltip />
:::

### 安装主题

在创建 Valaxy 项目后，您需要安装主题以便项目能够按照您期望的样式呈现。

进入到您刚刚创建的 Valaxy 项目所在的文件夹，打开终端，然后执行以下命令来安装主题：

::: code-group

```bash [pnpm]
pnpm add valaxy-theme-sakura
```

```bash [npm]
npm install valaxy-theme-sakura
```

```bash [yarn]
yarn add valaxy-theme-sakura
```

:::

::: tip
如果您在创建的过程中遇到困难，强烈建议先看[Valaxy文档](https://valaxy.site/guide/getting-started)
:::

### 启用主题

在安装主题之后并不会启用主题。首先在 `valaxy.config.ts` 文件中启用 `sakura` 主题，您需要按照以下步骤操作：

打开 Valaxy 项目的根目录的 `valaxy.config.ts` 文件，修改如下标注的位置，以确保 TypeScript 的类型检查和自动完成功能能够正常使用

~~~ts {2-4}
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
~~~

::: tip
TypeScript 是 JavaScript 的一个超集，添加了类型系统和对 ES6+ 的支持。它不仅能让开发者在编码阶段就能发现潜在的错误，还能提高代码的可读性和可维护性

简单来说，TypeScript 可以在您编辑配置文件时自动完成代码提示，并且如果配置不正确，它会立即用红色警告提示您，以便您及时修正错误
:::

> 主题名称自动根据 `valaxy-theme-xxx` 的格式获取，如本主题名为`valaxy-theme-sakura`，所以sakura就是这个主题的名称

在theme选项中填入 `sakura` 来实现主题切换

~~~ts {5}
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
~~~

::: warning
请确保您已经正确地导入了所有必要的类型。如果导入的类型不正确，可能会导致构建失败
:::

> 通过遵循上述步骤，您可以顺利地在您的项目中启用 sakura 主题，并利用 TypeScript 提供的类型安全和代码智能提示功能，享受到更加愉快的博客使用体验

如果创建 Valaxy 项目的时候没有安装依赖，那么我们就要手动安装依赖:

::: code-group

```bash [pnpm]
pnpm i
```

```bash [npm]
npm install
```

```bash [yarn]
yarn
```

:::

完成上述配置后，您已经完成了基本设置。接下来，您就可以启动您的博客啦！

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

:::

### 部署

对于大多数用户来说，`hexo`和`hugo`的常见操作是构建生成网站内容后，再上传至仓库以部署网站。若需进行构建，直接运行`pnpm run build`命令即可，其操作步骤与之类似。然而，我并不推荐使用这种方法。想要了解更多部署方式，请参考[Valaxy部署文档](https://valaxy.site/guide/deploy)
