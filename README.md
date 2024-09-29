<h1 align="center">Valaxy Theme Sakura</h1>
<pre align="center">
🧪 正在测试、完善主题示例和主题文档
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
<a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md"><img src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" alt="Open in StackBlitz"></a>
</p>

![demo](https://valaxy-theme-sakura.s3.bitiful.net/demo.png)

- 简体中文 | [English](./README.en.md)
- [主题文档](https://sakura.valaxy.site/)
- [示例站点](https://sakura.valaxy.site/examples/gallery)

> [!Note]
> 我们正在更新主题文档及示例，预计将在 `v0.7.0` 版本会发布到 [Valaxy 主题橱窗](https://valaxy.site/themes/gallery)

## 安装

如果您还不清楚如何安装 Valaxy，建议先查看 Valaxy 的[安装文档](https://valaxy.site/guide/getting-started)了解安装过程。关于本主题的详细安装教程，请参考 valaxy-theme-sakura 的 [安装文档](https://sakura.valaxy.site/guide/installation)

如下是简要的安装方式：

```bash
pnpm add valaxy-theme-sakura
```

在您的 `valaxy.config.ts` 文件中进行如下修改：

```ts
import { defineConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
```

## 使用

如下是配置主题的一个简单的配置示例：

```ts
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    navbarTitle: ['かなしい', 'の', '心悦'],
    banner: {
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg'
      ],
      style: 'filter-dot',
    },
  },
})
```

由于配置项较多，关于配置详情请见[主题配置](https://sakura.valaxy.site/config/theme)

## 主题化

或许有些人并不喜欢花哨的效果，更偏爱简洁的博客风格。我们在默认配置中没有包含 Sakura 的样式，您可以按照以下步骤自行添加所需的效果。以下是最简单的添加主题文件的方法:

在 `styles` 目录的 `index.scss` 文件，填入以下内容：

```scss
@use 'valaxy-theme-sakura/styles/themes/sakura/index.scss' as *;
```

这样您的主题就添加了 Sakura 样式。关于更多主题配置，请参见[主题化](https://sakura.valaxy.site/styles/theming)

## 更新

随着版本不断迭代，我们建议您更新 [valaxy](https://github.com/YunYouJun/valaxy) 和 [valaxy-theme-sakura](https://github.com/WRXinYue/valaxy-theme-sakura) 的版本，以确保主题和框架保持最新同步。未来或许会有更多有趣的功能等待您去发现

```bash
pnpm add valaxy@latest
pnpm add valaxy-theme-sakura@latest
```

## 集成插件

> [!NOTE]
> 为了保持项目的轻量化，我们不会添加过多非必要依赖，可以自行安装所需插件

| 插件                                                                                              | 描述             |
| ------------------------------------------------------------------------------------------------- | ---------------- |
| [valaxy-addon-hitokoto](https://github.com/valaxyjs/valaxy-addon-hitokoto)                        | 一言插件         |
| [valaxy-addon-vercount](https://github.com/valaxyjs/valaxy-addon-vercount)                        | 网站访问统计插件 |
| [valaxy-addon-waline](https://github.com/YunYouJun/valaxy/tree/main/packages/valaxy-addon-waline) | Waline 评论组件  |

关于更多的插件可以访问 [Valaxy 插件橱窗](https://valaxy.site/addons/gallery)

## 贡献

我们欢迎任何人参与贡献。如果你有好的想法或建议，可以随时提出，详情请参见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 其他

相关计划清单已迁移至 [valaxy-theme-sakura projects](https://github.com/WRXinYue/valaxy-theme-sakura/projects)

## 致谢

本项目很大程度上受到了以下令人敬畏的项目的启发

- [云游君(云猫猫)](https://valaxy.site/)
- [wordpress-theme-sakura](https://github.com/mashirozx/sakura)
- [vitepress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
- [element-plus](https://github.com/element-plus/element-plus)
- [primevue](https://github.com/primefaces/primevue)
- [antfu.me](https://github.com/antfu/antfu.me)

感谢 [GitHub上的所有贡献者](https://github.com/wrxinyue/valaxy-theme-sakura/graphs/contributors)！

## License

> [!IMPORTANT]
> valaxy-theme-sakura 并未抄袭任何 [wordpress-theme-sakura](https://github.com/mashirozx/sakura) 的源码。valaxy-theme-sakura 是根据 [wordpress-theme-sakura](https://github.com/mashirozx/sakura) 的样式进行模仿，并实现了主题化和组件设计

[MIT License](https://github.com/WRXinYue/valaxy-theme-sakura/blob/main/LICENSE) © 2024-PRESENT [WRXinYue](https://github.com/wrxinyue)
