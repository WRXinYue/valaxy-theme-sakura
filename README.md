<h1 align="center">Valaxy Theme Sakura</h1>
<pre align="center">
🧪 正在测试、完善主题示例和主题文档 | <a href="https://sakura.valaxy.site/">文档</a> | <a href="https://sakura.wrxinyue.org/">示例</a> | <a href="./README-en.md">English</a>
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-theme-sakura" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-theme-sakura?color=0078E7" alt="NPM version"></a>
<a href="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml"><img src="https://github.com/WRXinYue/valaxy-theme-sakura/actions/workflows/release.yml/badge.svg" alt="Release"></a>
<a href="https://stackblitz.com/edit/stackblitz-starters-tqdtk7?file=README.md"><img src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" alt="Open in StackBlitz"></a>
</p>

### 🚀 使用

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

### 📋 计划清单

- 添加文章加密支持 (预计0.6.0版本发布)
- 添加对双栏及三栏布局支持 (预计0.6.0版本发布)
- 添加博客友联及RSS支持 (预计0.6.0版本发布)
- 添加博客可视化数据统计 (预计0.7.0版本发布)
- 发布博客主题到valaxy (预计0.7.0版本同步)
- 可视化博客主题编辑 (预计0.8.0版本发布)
- 添加后端及后端文章管理面板支持 (等待Ocean项目， 预计1.0.0+)
- 添加本地文章与云端进行数据同步支持 (等待Ocean项目, 预计1.0.0+)

**非重要:**

- 添加黑夜白天页面过度动画
- 添加更多画面效果内置支持，如樱花飘落、星空等
- 添加首页视频播放效果
- 添加网页右下角工具组件
- 优化网页加载，如网络不好博客产生加载闪烁
- 优化Sakura文档样式
- 添加网站导航网站模板

### 🌟 鸣谢

- [云游君(云猫猫)](https://valaxy.site/)
- [樱花庄的白猫博客主题](https://github.com/mashirozx/sakura)
- [hexo-theme-sakura](https://github.com/honjun/hexo-theme-sakura)
- [vitePress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura)
