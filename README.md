<h1 align="center">Valaxy Theme Sakura</h1>
<pre align="center">
🧪 正在测试、完善主题示例和主题文档 | <a href="https://sakura.valaxy.site/">文档</a> | <a href="https://sakura.wrxinyue.org/">示例</a> | <a href="./README-en.md">English</a>
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
<a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md"><img src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" alt="Open in StackBlitz"></a>
</p>

### 使用

**安装主题:**

~~~bash
pnpm create valaxy
pnpm add valaxy-theme-sakura
~~~

**启用主题:**

<details>

~~~ts
// valaxy.config.ts
import { defineConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
~~~

<br></details>

**更新主题：**

~~~bash
pnpm up valaxy-theme-sakura --latest
~~~

### 鸣谢

- [云游君(云猫猫)](https://valaxy.site/)
- [樱花庄的白猫博客主题](https://github.com/mashirozx/sakura)
- [hexo-theme-sakura](https://github.com/honjun/hexo-theme-sakura)
- [vitePress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
