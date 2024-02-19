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

~~~bash
pnpm add valaxy-theme-sakura
~~~

### 启用主题
~~~ts
// valaxy.config.ts
import { defineConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
~~~

### 更新主题
~~~bash
pnpm up valaxy-theme-sakura --latest
~~~
