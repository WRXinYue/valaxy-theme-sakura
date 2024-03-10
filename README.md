<h1 align="center">Valaxy Theme Sakura</h1>
<pre align="center">
🧪 第一阶段即将完成 | <a href="https://sakura.valaxy.site/">Docs</a> | <a href="https://sakura.wrxinyue.org/">Demo</a>
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
</p>

[主题手册](https://sakura.valaxy.site/)

### 使用

**安装主题:**

~~~bash
pnpm create valaxy
pnpm add valaxy-theme-sakura
~~~

**启用主题:**

~~~ts
// valaxy.config.ts
import { defineConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
~~~

**配置示例:**

> 详情请见[文档](https://sakura.valaxy.site/)

**更新主题：**

~~~bash
pnpm up valaxy-theme-sakura --latest
~~~

### 文档 & 完整配置

> 更多信息看[详情配置](https://sakura.valaxy.site/)

### 鸣谢

- [云游君(云猫猫)](https://valaxy.site/)
- [樱花庄的白猫博客主题](https://github.com/mashirozx/sakura)
- [hexo-theme-sakura](https://github.com/honjun/hexo-theme-sakura)
- [vitePress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
