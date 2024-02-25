---
title: Getting Started
title_zh-CN: 开始
categories:
  - getting-started
end: true
top: 100
---

### 如何使用

> 推荐使用pnpm安装, 如果没有pnpm使用 `npm install -g pnpm` 来进行安装

```bash [pnpm]
pnpm create valaxy
```

::: details You will be greeted with a few simple questions.
<CreateValaxyTooltip />
:::

### 安装主题

进入到刚刚生成文件夹位置打开终端，执行如下命令进行安装主题:

~~~bash
pnpm add valaxy-theme-sakura
~~~

::: tip
如果您在创建的过程中遇到困难，强烈建议先看[Valaxy文档](https://valaxy.site/guide/getting-started)
:::

### 启用主题

在 `valaxy.config.ts` 文件中启用 `sakura` 主题，您需要按照以下步骤操作：

**导入所需的函数和类型** - 通过从 `valaxy` 和 `valaxy-theme-sakura` 导入 `defineValaxyConfig` 和 `ThemeUserConfig`，以确保您可以使用 TypeScript 的类型检查和自动完成功能。

~~~ts {2-4}
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
~~~

**切换Sakura主题** - 在theme进行配置，如`sakura`

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

> 通过遵循上述步骤，您可以顺利地在您的项目中启用 sakura 主题，并利用 TypeScript 提供的类型安全和代码智能提示功能，提高开发效率和项目的可维护性

如果设置选项的时候没有安装依赖，那么我们就要手动安装依赖:

```bash
pnpm i
```

完成如上配置之后就完成最基本的设置了，接下来你就可以启动你的博客了！

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

:::

> hexo，hugo 对于一般人都是通过构建产物然后上传到仓库进行网站部署，如果想要构建直接`pnpm run build`即可，方式几乎相同。但是这个方式我是不推荐的。关于更多部署方式请看[Valaxy部署文档](https://valaxy.site/guide/deploy)
