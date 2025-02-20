---
title: Nav
title_zh-CN: 导航栏
toc: true
categories:
  - theme-config
top: 500
---

导航栏允许您配置页面间的跳转，例如到归档、关于页面，同时也可以设置网站图标和网站标题等元素

## ThemeConfig

| 属性名  | 类型        | 默认值      | 说明                 |
| ------- | ----------- | ----------- | -------------------- |
| favicon | `boolean`   | `false`     | 导航栏图标, 默认关闭 |
| navbar  | `NavItem[]` | `undefined` | 导航栏               |

**NavItem:**

| 属性名     | 类型                 | 默认值 | 说明                                                   |
| ---------- | -------------------- | ------ | ------------------------------------------------------ |
| text       | `string`             | ---    | 导航栏项的显示文本                                     |
| locale     | `string` \| `number` | ---    | 导航栏项的语言设置，用于国际化支持                     |
| link       | `string`             | ---    | 导航栏项的链接地址，点击后将被重定向到此URL            |
| icon       | `string`             | ---    | 导航栏项的图标，可以是图标的路径或图标库中的一个标识符 |
| isExternal | `boolean`            | ---    | 是否使用 a 标签跳转                                    |
| submenu    | `NavItem[]`          | ---    | 二级菜单                                               |

## 自定义高度

修改css全局变量 `--sakura-navbar-height` 即可

## 更改标题文字大小

```scss {1,5-6,9-10}
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-navbar-brand {
  .logo-link {
    font-size: 24px;
    font-weight: 600;

    @include screen('md') {
      font-size: 28px;
      font-weight: 800;
    }
  }
}
```

## 高级技巧

### 导航栏定位改用 `sticky`

```scss
.sakura-navbar {
  position: sticky;
}
```

### 如何为`sticky`不占用实际位置

```scss
.app-container {
  margin-top: calc(-1 * var(--sakura-navbar-height));
}
```
