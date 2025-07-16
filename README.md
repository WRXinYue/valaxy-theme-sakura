<h1 align="center">valaxy-theme-sakura</h1>
<pre align="center">
A simple, personalized, and cute anime-style blog theme ❥(ゝω・✿ฺ)
</pre>

<p align="center">
  <a href="https://npmjs.com/package/valaxy-theme-sakura" rel="nofollow" target="__blank"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura/latest.svg?style=flat&colorA=18181B&colorB=FF6F91" alt="NPM version"></a>
  <a href="https://npm.chart.dev/valaxy-theme-sakura" target="__blank"><img src="https://img.shields.io/npm/dm/valaxy-theme-sakura.svg?style=flat&colorA=18181B&colorB=FF6F91" alt="Downloads"></a>
  <a href="https://github.com/wrxinyue/valaxy-theme-sakura/tree/main/LICENSE" target="__blank"><img src="https://img.shields.io/github/license/wrxinyue/valaxy-theme-sakura.svg?style=flat&colorA=18181B&colorB=FF6F91" alt="License"></a>
  <a href="https://npmjs.com/package/valaxy" rel="nofollow" target="__blank"><img src="https://img.shields.io/npm/dependency-version/valaxy-theme-sakura/dev/valaxy?style=flat&colorA=18181B&colorB=9333ea" alt="Valaxy version"></a>
  <a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md" target="__blank"><img src="https://img.shields.io/badge/Open in StackBlitz-_?logo=stackblitz&colorA=18181B&colorB=439CFF" alt="Open in StackBlitz"></a>
</p>

<p align="center">
<a href="https://sakura.wrxinyue.org" target="_blank">
<img src="https://valaxy-theme-sakura.s3.bitiful.net/demo%2F2025-01-05%20222200.png" alt="valaxy-theme-sakura" />
</a>
</p>

<div align="center">
<table>
<tbody>
<tr>
<td align="center">
  <img width="2000" height="0" alt="" aria-hidden="true"><br>
  <span><b>English | <a href="./README.zh-CN.md">简体中文</a></b></span><br>
  <sub>We are updating the theme documentation and examples, expected to be released in version `v0.7.0` on the <a href="https://valaxy.site/themes/gallery">Valaxy Theme Gallery</a></sub><br>
  <sub><a href="https://sakura.wrxinyue.org/">Live Demo</a>  | <a href="https://sakura.valaxy.site/">Documentation</a> | <a href="https://sakura.valaxy.site/examples/gallery">Theme Sites</a></sub><br>
  <img width="2000" height="0" alt="" aria-hidden="true">
</td>
</tr>
</tbody>
</table>
</div>

## Getting Started

> [!TIP]
> If you are new to Valaxy, it's recommended to check the [installation documentation](https://valaxy.site/guide/getting-started) for the setup process. For detailed installation instructions, refer to the [installation documentation for valaxy-theme-sakura](https://sakura.valaxy.site/guide/installation).

```bash
pnpm add valaxy-theme-sakura
```

<details>
<summary>valaxy.config.ts</summary><br>

For detailed configuration and explanations, see [Theme Configuration](https://sakura.valaxy.site/config/theme).

```ts
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    ui: {
      primary: '#ff4e6a',
    },

    hero: {
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

## Updates

As versions continue to evolve, we recommend updating [valaxy](https://github.com/YunYouJun/valaxy) and [valaxy-theme-sakura](https://github.com/WRXinYue/valaxy-theme-sakura) to ensure the theme and framework are up-to-date. More exciting features may await your discovery in the future.

```bash
pnpm add valaxy@latest
pnpm add valaxy-theme-sakura@latest
```

## Integration Plugins

> [!NOTE]
> To keep the project lightweight, we will not add too many unnecessary dependencies. You can install the plugins you need. For more plugins, visit the [Valaxy Plugin Gallery](https://valaxy.site/addons/gallery).

| Plugin                                                                                            | Description               |
| ------------------------------------------------------------------------------------------------- | ------------------------- |
| [valaxy-addon-hitokoto](https://github.com/valaxyjs/valaxy-addon-hitokoto)                        | Hitokoto Plugin           |
| [valaxy-addon-vercount](https://github.com/valaxyjs/valaxy-addon-vercount)                        | Website Statistics Plugin |
| [valaxy-addon-waline](https://github.com/YunYouJun/valaxy/tree/main/packages/valaxy-addon-waline) | Waline Comment Component  |

## Contribution

We welcome anyone to contribute. If you have good ideas or suggestions, feel free to share them. For details, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Other

The related task list has been migrated to [valaxy-theme-sakura projects](https://github.com/WRXinYue/valaxy-theme-sakura/projects).

## Acknowledgments

This project is heavily inspired by the following awesome projects.

- [YunYouJun](https://valaxy.site/)
- [wordpress-theme-sakura](https://github.com/mashirozx/sakura)
- [vitepress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
- [element-plus](https://github.com/element-plus/element-plus)
- [primevue](https://github.com/primefaces/primevue)
- [antfu.me](https://github.com/antfu/antfu.me)

And thanks to [all the contributors on GitHub](https://github.com/wrxinyue/valaxy-theme-sakura/graphs/contributors)!

## License

> [!IMPORTANT]
> valaxy-theme-sakura does not copy any source code from [wordpress-theme-sakura](https://github.com/mashirozx/sakura). valaxy-theme-sakura is inspired by the styles of [wordpress-theme-sakura](https://github.com/mashirozx/sakura) and implements theming and component design.

[MIT License](https://github.com/WRXinYue/valaxy-theme-sakura/blob/main/LICENSE) © 2024-PRESENT [WRXinYue](https://github.com/wrxinyue)
