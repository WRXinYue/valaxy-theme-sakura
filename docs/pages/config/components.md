---
title: Component config
title_zh-CN: 组件配置
toc: true
categories:
  - config
---

## 组件配置{lang="zh-CN"}

### Component configuration{lang="en"}

## Component 组件{lang="zh-CN"}

## Component{lang="en"}

::: zh-CN
由于 valaxy 是基于 vue 构建的博客框架，我们可以充分利用 Vue 的全部功能和特性，在此，**组件(Component)** 是 Vue 中的一个核心概念，一个页面可以是由多个组件相结合，这样不仅可以将界面分割成独立、可复用的单元，还能够根据个人偏好自由组合这些单元以构建网页。这种做法使得代码变得更加模块化和有序，在这里我们不需要关注 Vue **组件(Component)** 核心机制， 我们只需学会如何配置即可，如果您想深入了解 **组件(Component)** 的相关信息，请参考 [Vue 官方文档](https://vuejs.org/guide/essentials/component-basics)
:::

:::en
Since Valaxy is a blog framework built on Vue, we can fully utilize all the features and functionalities of Vue. Here, **Component** is a core concept in Vue. A page can be composed of multiple components, allowing you to divide the interface into independent, reusable units. These units can be freely combined according to personal preferences to build web pages. This approach makes the code more modular and organized.

In this context, we do not need to focus on the core mechanisms of Vue **Components**; we only need to learn how to configure them. If you want to delve deeper into the related information on **Components**, please refer to the [official Vue documentation](https://vuejs.org/guide/essentials/component-basics).
:::

## 组件替换{lang="zh-CN"}

### Component replacement{lang="en"}
::: zh-CN
要替换组件，您只需创建一个与原主题中相同名称的自定义组件，系统便会自动进行替换。我们推荐通过 **[自定义组件](#自定义组件)** 来进行这种替换操作。详细信息和操作指南，请访问 [Valaxy Components](https://valaxy.site/guide/custom/components) 学习如何替换组件
:::

::: en
To replace a component, you simply need to create a custom component with the same name as the one in the original theme, and the system will automatically perform the replacement. We recommend using **[Custom Components](#custom-components)** for this kind of operation. For detailed information and instructions, please visit [Valaxy Components](https://valaxy.site/guide/custom/components) to learn how to replace components.
:::

## 系统组件{lang="zh-CN"}

## System components{lang="en"}

::: zh-CN
系统组件是框架中最基础的部分，类似于应用的基础架构。由于它们的基础性质，我们通常不建议对这些系统组件进行随意的修改或替换
:::

::: en
System components are the most fundamental parts of the framework, akin to the foundational infrastructure of an application. Due to their foundational nature, we generally do not recommend arbitrary modification or replacement of these system components.
:::

## 自定义组件{lang="zh-CN"}

## Custom components{lang="en"}

::: zh-CN
您可以通过自定义组件来调用或替换系统组件。这里，您可以根据自己的需要替换或修改想要的组件。自定义组件通常包括一套与主题相匹配的组件，使得个性化定制成为可能
:::

:::en
You can call or replace system components through custom components. Here, you can replace or modify the desired components according to your needs. Custom components usually include a set of components that match the theme, making personalized customization possible.
:::

## 布局组件{lang="zh-CN"}

## Layout components{lang="en"}

::: zh-CN
布局组件主要用于定义应用的布局结构。这些组件通常是预设的各种布局框架，可以通过绑定现有的其他组件来使用这些布局组件，以便更加轻松地应用主题和进行页面设计
:::

::: en
Layout components are primarily used to define the layout structure of an application. These components typically consist of various preset layout frameworks, which can be used by binding existing components to these layout components. This allows for easier application of themes and page design.
:::

## 主题组件{lang="zh-CN"}

## Theme component{lang="en"}

::: zh-CN
主题组件提供了多种不同的结构和样式选项，允许自由更改布局和替换组件。通过自定义组件替换这些主题组件，您可以将您的博客转变为具有独特风格和个性的平台
:::

:::en
Theme components offer a variety of different structures and style options, allowing for flexible changes in layout and component replacement. By replacing these theme components with custom components, you can transform your blog into a platform with unique style and personality.
:::
