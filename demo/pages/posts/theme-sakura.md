---
title: Valaxy 主题 Sakura 🌸
tags: [sakura]
cover: https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/optimize/60651947_p0.webp
date: 2024-12-31
---

### 如何使用

**安装主题:**

```bash
# pnpm (推荐)
pnpm create valaxy

# 如果没有pnpm使用 npm install -g pnpm 来进行安装
# npm
# npm init valaxy
# yarn
# yarn create valaxy
pnpm add valaxy-theme-sakura
```

**启用主题:**

```ts
// valaxy.config.ts
import { defineConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura'
})
```

**配置示例:**

<<< @/valaxy.config.ts

**更新主题：**

```bash
pnpm up valaxy-theme-sakura --latest
# npm update valaxy-theme-sakura --latest
```
