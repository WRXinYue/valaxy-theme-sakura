---
title: SakuraNavbar
title_zh-CN: 导航栏 (SakuraNavbar)
toc: true
categories:
  - components
---

## SakuraNavbar

## 预览

<SakuraNavbarPG />

## 启用 `sticky`

```scss
.sakura-navbar {
  position: sticky;
}
```

## 如何为`sticky`不占用实际位置

```scss
.app-container {
  margin-top: calc(-1 * var(--st-c-navbar-height));
}
```

## 自定义高度

修改css全局变量`--st-c-navbar-height`即可

## API

### Attributes

| 属性名   | 类型                   | 默认值                   | 说明                                     |
| -------- | ---------------------- | ------------------------ | ---------------------------------------- |
| favicon  | `boolean`              | `undefined`              | 导航栏图标, 默认为 `themeConfig.favicon` |
| title    | `string \| string[]`   | `undefined`              | ---                                      |
| invert   | `boolean`              | `false`                  | 滚动触发反转, 需开启 `autoHide` 选项     |
| autoHide | `boolean`              | `false`                  | 是否自动隐藏导航栏                       |
| animIn   | `string` \| `string[]` | `animation-fade-in-left` | 进入动画效果                             |
| animOut  | `string` \| `string[]` | `animation-fade-in-left` | 离开动画效果                             |

### ThemeConfig

| 属性名      | 类型                   | 默认值      | 说明                 |
| ----------- | ---------------------- | ----------- | -------------------- |
| favicon     | `boolean`              | `false`     | 导航栏图标, 默认关闭 |
| navbar      | `NavItem[]`            | `undefined` | 导航栏               |
| navbarTitle | `string` \| `string[]` | `''`        | 导航栏标题           |

**NavItem:**

| 属性名     | 类型                 | 默认值 | 说明                                                   |
| ---------- | -------------------- | ------ | ------------------------------------------------------ |
| text       | `string`             | ---    | 导航栏项的显示文本                                     |
| locale     | `string` \| `number` | ---    | 导航栏项的语言设置，用于国际化支持                     |
| link       | `string`             | ---    | 导航栏项的链接地址，点击后将被重定向到此URL            |
| icon       | `string`             | ---    | 导航栏项的图标，可以是图标的路径或图标库中的一个标识符 |
| isExternal | `boolean`            | ---    | 是否使用 a 标签跳转                                    |
| submenu    | `NavItem[]`          | ---    | 二级菜单                                               |
