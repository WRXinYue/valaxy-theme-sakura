<h1 align="center">Valaxy Theme Sakura</h1>
<pre align="center">
🧪 Currently testing and perfecting theme samples and theme documentation | <a href="https://sakura.valaxy.site/">Docs</a> | <a href="https://sakura.wrxinyue.org/">Demo</a> | <a href="./README.md">中文</a>
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
<a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md"><img src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" alt="Open in StackBlitz"></a>
</p>

### Usage

**Install theme:**

```bash
pnpm create valaxy
pnpm add valaxy-theme-sakura
```

**Activate theme:**

<details>

```ts
// valaxy.config.ts
import { defineConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
```

<br></details>

**Update Theme:**

```bash
pnpm up valaxy-theme-sakura --latest
```

### Thanks

- [YunYouJun](https://valaxy.site/)
- [樱花庄的白猫博客主题](https://github.com/mashirozx/sakura)
- [hexo-theme-sakura](https://github.com/honjun/hexo-theme-sakura)
- [vitePress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
