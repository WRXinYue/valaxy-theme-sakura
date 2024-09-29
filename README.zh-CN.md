<h1 align="center">valaxy-theme-sakura</h1>
<pre align="center">
一个简单、个性化、可爱的动漫风格博客主题 💖
</pre>

<p align="center">
  <a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura/latest.svg?style=flat&colorA=18181B&colorB=FF6F91" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/valaxy-theme-sakura"><img src="https://img.shields.io/npm/dm/valaxy-theme-sakura.svg?style=flat&colorA=18181B&colorB=FF6F91" alt="Downloads"></a>
  <a href="https://github.com/wrxinyue/valaxy-theme-sakura/tree/main/LICENSE"><img src="https://img.shields.io/github/license/wrxinyue/valaxy-theme-sakura.svg?style=flat&colorA=18181B&colorB=FF6F91" alt="License"></a>
  <a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md"><img src="https://img.shields.io/badge/Open in StackBlitz-_?logo=stackblitz&colorA=18181B&colorB=439CFF" alt="Open in StackBlitz"></a>
</p>

<p align="center">
<a href="https://sakura.wrxinyue.org" target="_blank">
<img src="https://valaxy-theme-sakura.s3.bitiful.net/demo/2024-09-29.png" alt="valaxy-theme-sakura" />
</a>
</p>

<div align="center">
<table>
<tbody>
<tr>
<td align="center">
  <img width="2000" height="0" alt="" aria-hidden="true"><br>
  <span><b>简体中文 | <a href="./README.md">English</a></b></span><br>
  <sub>我们正在更新主题文档及示例，预计将在 `v0.7.0` 版本会发布到 <a href="https://valaxy.site/themes/gallery">Valaxy 主题橱窗</a></sub><br>
  <sub><a href="https://sakura.wrxinyue.org/">在线 Demo</a>  | <a href="https://sakura.valaxy.site/">文档</a> | <a href="https://sakura.valaxy.site/examples/gallery">主题站点</a></sub><br>
  <img width="2000" height="0" alt="" aria-hidden="true">
</td>
</tr>
</tbody>
</table>
</div>

## 快速开始

> [!TIP]
> 如果您是第一次使用 Valaxy，建议先查看 Valaxy 的[安装文档](https://valaxy.site/guide/getting-started)了解安装过程。关于详细安装教程请参照 valaxy-theme-sakura 的 [安装文档](https://sakura.valaxy.site/guide/installation)

```bash
pnpm add valaxy-theme-sakura
```

<details>
<summary>valaxy.config.ts</summary><br>

关于详细配置以及说明请见[主题配置](https://sakura.valaxy.site/config/theme)

```ts
import { defineConfig } from 'valaxy'
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

<br></details>

在 `styles` 目录的 `index.scss` 文件，填入以下内容：

```scss
@use 'valaxy-theme-sakura/styles/themes/sakura/index.scss' as *;
```

Sakura 以轻量化为首要目的在默认配置中没有包含 Sakura 的样式，详情参见[主题化](https://sakura.valaxy.site/styles/theming)

## 更新

随着版本不断迭代，我们建议您更新 [valaxy](https://github.com/YunYouJun/valaxy) 和 [valaxy-theme-sakura](https://github.com/WRXinYue/valaxy-theme-sakura) 的版本，以确保主题和框架保持最新同步。未来或许会有更多有趣的功能等待您去发现

```bash
pnpm add valaxy@latest
pnpm add valaxy-theme-sakura@latest
```

## 集成插件

> [!NOTE]
> 为了保持项目的轻量化，我们不会添加过多非必要依赖，可以自行安装所需插件，关于更多的插件可以访问 [Valaxy 插件橱窗](https://valaxy.site/addons/gallery)

| 插件                                                                                              | 描述             |
| ------------------------------------------------------------------------------------------------- | ---------------- |
| [valaxy-addon-hitokoto](https://github.com/valaxyjs/valaxy-addon-hitokoto)                        | 一言插件         |
| [valaxy-addon-vercount](https://github.com/valaxyjs/valaxy-addon-vercount)                        | 网站访问统计插件 |
| [valaxy-addon-waline](https://github.com/YunYouJun/valaxy/tree/main/packages/valaxy-addon-waline) | Waline 评论组件  |

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
