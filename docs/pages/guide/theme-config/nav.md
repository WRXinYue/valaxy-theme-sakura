---
title: Nav
title_zh-CN: 导航栏
toc: true
categories:
  - theme-config
top: 500
---

导航栏允许您配置页面间的跳转，例如到归档、关于页面，同时也可以设置网站图标和网站标题等元素。本主题提供了丰富的导航栏配置选项，可以根据需要进行自定义。

## 基本配置

### ThemeConfig

| 属性名        | 类型                 | 默认值      | 说明                                                        |
| ------------- | -------------------- | ----------- | ----------------------------------------------------------- |
| favicon       | `boolean`            | `false`     | 导航栏图标, 默认关闭 (已废弃，请使用 navbarOptions.favicon) |
| navbar        | `NavItem[]`          | `undefined` | 导航栏项目列表                                              |
| navbarTitle   | `string \| string[]` | `undefined` | 导航栏标题 (已废弃，请使用 navbarOptions.title)             |
| navbarOptions | `NavbarOptions`      | `undefined` | 导航栏选项配置                                              |

### NavItem 配置

导航栏项目的配置选项：

| 属性名   | 类型               | 默认值 | 说明                                                   |
| -------- | ------------------ | ------ | ------------------------------------------------------ |
| text     | `string`           | ---    | 导航栏项的显示文本                                     |
| locale   | `string \| number` | ---    | 导航栏项的语言设置，用于国际化支持                     |
| link     | `string`           | ---    | 导航栏项的链接地址，点击后将被重定向到此URL            |
| icon     | `string`           | ---    | 导航栏项的图标，可以是图标的路径或图标库中的一个标识符 |
| animated | `string`           | ---    | 导航栏项图标的动画效果                                 |
| target   | `string`           | ---    | a 标签的 target 属性，用于指定链接打开的方式           |
| items    | `NavItem[]`        | ---    | 子菜单项列表                                           |

### NavbarOptions 配置

导航栏的高级配置选项：

| 属性名         | 类型                                             | 默认值                     | 说明                                   |
| -------------- | ------------------------------------------------ | -------------------------- | -------------------------------------- |
| favicon        | `boolean`                                        | `true`                     | 是否显示站点图标                       |
| title          | `string \| string[]`                             | ---                        | 导航栏的标题，可以是字符串或字符串数组 |
| subTitle       | `string`                                         | ---                        | 导航栏的副标题                         |
| invert         | `boolean \| string \| string[]`                  | `false`                    | 是否反转导航栏颜色                     |
| enableHover    | `boolean`                                        | `true`                     | 是否启用悬停效果                       |
| autoHide       | `boolean \| string \| string[]`                  | `false`                    | 是否自动隐藏导航栏                     |
| animIn         | `string`                                         | ---                        | 导航栏显示的动画效果                   |
| animOut        | `string`                                         | ---                        | 导航栏隐藏的动画效果                   |
| showMarker     | `boolean`                                        | `false`                    | 是否显示导航栏标记                     |
| offset         | `number`                                         | `100`                      | 导航栏偏移量                           |
| tools          | `('toggleLocale' \| 'toggleDark' \| 'search')[]` | `['toggleDark', 'search']` | 导航栏的工具按钮                       |
| hamburgerStyle | `'uneven' \| 'old'`                              | `'uneven'`                 | 导航栏汉堡按钮的样式                   |

## 配置示例

### 基本导航栏配置

```ts
themeConfig: {
  navbar: [
    {
      text: '首页',
      link: '/',
      icon: 'i-ri-home-line'
    },
    {
      text: '归档',
      link: '/archives/',
      icon: 'i-ri-archive-line'
    },
    {
      text: '分类',
      link: '/categories/',
      icon: 'i-ri-folder-2-line'
    },
    {
      text: '标签',
      link: '/tags/',
      icon: 'i-ri-price-tag-3-line'
    },
    {
      text: '关于',
      link: '/about/',
      icon: 'i-ri-information-line'
    }
  ]
}
```

### 带子菜单的导航栏配置

```ts
themeConfig: {
  navbar: [
    {
      text: '首页',
      link: '/',
      icon: 'i-ri-home-line'
    },
    {
      text: '文档',
      icon: 'i-ri-book-2-line',
      items: [
        {
          text: '指南',
          link: '/guide/'
        },
        {
          text: 'API参考',
          link: '/api/'
        }
      ]
    },
    {
      text: '关于',
      link: '/about/',
      icon: 'i-ri-information-line'
    }
  ]
}
```

### 导航栏选项配置

```ts
themeConfig: {
  navbarOptions: {
    favicon: true,
    title: '我的博客',
    subTitle: '记录生活点滴',
    invert: false,
    autoHide: true,
    animIn: 'fadeIn',
    animOut: 'fadeOut',
    showMarker: true,
    tools: ['toggleDark', 'search', 'toggleLocale'],
    hamburgerStyle: 'uneven'
  }
}
```

## 自定义样式

### 自定义高度

修改CSS全局变量 `--sakura-navbar-height` 即可：

```scss
:root {
  --sakura-navbar-height: 60px;
}
```

### 更改标题文字大小

```scss
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

### 自定义导航栏动画

您可以通过设置 `animIn` 和 `animOut` 属性来自定义导航栏的显示和隐藏动画。这些属性接受任何有效的 CSS 动画名称。

```ts
themeConfig: {
  navbarOptions: {
    autoHide: true,
    animIn: 'slideInDown',
    animOut: 'slideOutUp'
  }
}
```

### 响应式导航栏

导航栏会在小屏幕设备上自动转换为汉堡菜单。您可以通过 `hamburgerStyle` 属性来选择汉堡按钮的样式：

- `'uneven'`: 具有一条不一样长的样式（默认）
- `'old'`: 三条长度相同的经典样式

```ts
themeConfig: {
  navbarOptions: {
    hamburgerStyle: 'old'
  }
}
```

## 注意事项

1. 为了更好的用户体验，建议导航栏项目不要超过 7 个。
2. 子菜单层级不宜过深，一般不超过两级。
3. 图标可以使用任何支持的图标库，如 Remix Icon、Font Awesome 等。
4. 当使用 `autoHide` 功能时，建议同时设置 `animIn` 和 `animOut` 以获得更好的视觉效果。
5. 已废弃的配置项（如 `favicon` 和 `navbarTitle`）将在未来版本中移除，请使用 `navbarOptions` 中的对应配置项。
