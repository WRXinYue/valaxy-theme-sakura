---
title: footer
title_zh-CN: 页脚
categories:
  - theme-config
top: 500
---

# Footer 页脚

页脚是网站的底部区域，通常包含版权信息、建站时间、备案信息等内容。Sakura 主题提供了丰富的页脚配置选项，让你可以自定义页脚的外观和内容。

## 基本配置

在 `valaxy.config.ts` 中，你可以通过 `themeConfig.footer` 来配置页脚：

```ts
export default defineValaxyConfig({
  themeConfig: {
    footer: {
      since: 2022,
      icon: {
        animated: true,
        url: 'https://your-website.com',
        title: 'Your Name',
      },
      powered: true,
      beian: {
        enable: true,
        icp: '浙ICP备XXXXXXXX号',
      },
    }
  }
})
```

## 页脚配置项

### **FooterConfig**

| 属性名    | 类型                | 默认值 | 说明                                                 |
| --------- | ------------------- | ------ | ---------------------------------------------------- |
| `since`   | `number`            | `2024` | 建站年份，用于显示版权信息，如 "© 2024-2025"        |
| `icon`    | `FooterIconConfig`  | ---    | 页脚图标配置，详见下方 FooterIconConfig              |
| `powered` | `boolean`           | `true` | 是否显示 "Powered by Valaxy & Sakura" 信息           |
| `beian`   | `FooterBeianConfig` | ---    | 备案信息配置，详见下方 FooterBeianConfig（中国特有） |

### **FooterIconConfig**

| 属性名     | 类型      | 默认值                            | 说明                                               |
| ---------- | --------- | --------------------------------- | -------------------------------------------------- |
| `animated` | `boolean` | `true`                            | 图标是否有动画效果                                 |
| `img`      | `string`  | ---                               | 图标的图片路径或图标类名（如 'i-fa6-solid:heart'） |
| `url`      | `string`  | `'https://sponsors.yunyoujun.cn'` | 点击图标跳转的链接                                 |
| `title`    | `string`  | `'WRXinYue'`                      | 鼠标悬停在图标上时显示的标题（tooltip）            |

### **FooterBeianConfig**

| 属性名   | 类型      | 默认值 | 说明                                                     |
| -------- | --------- | ------ | -------------------------------------------------------- |
| `enable` | `boolean` | ---    | 是否启用备案信息显示                                     |
| `icp`    | `string`  | ---    | ICP备案号，如 "浙ICP备XXXXXXXX号"                        |
| `no`     | `string`  | ---    | 公安备案号，如 "XXXXXXXXXXXXXXXXXX"                      |
| `gongan` | `object`  | ---    | 公安备案配置，包含 `local`（地区代码）和 `num`（备案号） |

## 使用示例

### 基础页脚配置

最简单的页脚配置，只显示版权信息和 Powered by 信息：

```ts
footer: {
  since: 2022,
  powered: true
}
```

### 带图标的页脚

添加一个带动画效果的图标到页脚：

```ts
footer: {
  since: 2022,
  icon: {
    animated: true,
    img: 'i-fa6-solid:heart',
    url: 'https://your-website.com',
    title: '点击访问我的主页'
  },
  powered: true
}
```

### 带备案信息的页脚（中国网站）

为中国大陆的网站添加必要的备案信息：

```ts
footer: {
  since: 2022,
  powered: true,
  beian: {
    enable: true,
    icp: '浙ICP备XXXXXXXX号',
    no: 'XXXXXXXXXXXXXXXXXX',
    gongan: {
      local: '浙',
      num: 'XXXXXXXX'
    }
  }
}
```

## 自定义页脚样式

Sakura 主题的页脚样式可以通过 CSS 变量进行自定义。你可以在你的 `styles/index.scss` 文件中添加以下代码来修改页脚的样式：

```scss
:root {
  // 页脚背景色
  --sakura-footer-bg: rgba(255, 255, 255, 0.8);

  // 页脚文字颜色
  --sakura-footer-text: #666;

  // 页脚链接颜色
  --sakura-footer-link: #fe9500;

  // 页脚链接悬停颜色
  --sakura-footer-link-hover: #ff6d6d;
}

html.dark {
  // 暗色模式下的页脚背景色
  --sakura-footer-bg: rgba(30, 30, 32, 0.8);

  // 暗色模式下的页脚文字颜色
  --sakura-footer-text: #aaa;
}
```

## 注意事项
