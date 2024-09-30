---
title: Valaxy 主题 Sakura 🌸
tags: [sakura]
cover: https://valaxy-theme-sakura.s3.bitiful.net/demo/2024-09-29.png
date: 2024-12-31
codeHeightLimit: 600
---

![sakura](https://valaxy-theme-sakura.s3.bitiful.net/demo/2024-09-29.png 'valaxy-theme-sakura')

### 如何使用

**安装主题:**

```bash
# pnpm (推荐)
pnpm create valaxy

# 如果没有pnpm使用 npm install -g pnpm 来进行安装
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
```
