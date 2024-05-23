---
title: SidebarThemeOverview
title_zh-CN: 概览侧边栏 (SidebarThemeOverview)
toc: true
categories:
  - components-themes
---

## 概览侧边栏 SidebarThemeOverview

提供了一个总览或概要，可以用来显示统计数据、关键信息点或摘要信息

~~~vue
<script lang="ts" setup>
import { computed } from 'vue'
import type { NavItem } from '../../types'
import { useThemeConfig } from '../../composables'

const props = defineProps({
  sidebar: Array<NavItem>,
})

const themeConfig = useThemeConfig()

const sidebar = computed(() => props.sidebar || themeConfig.value.sidebar)
</script>

<template>
  <div class="sidebar-panel" p="2">
    <SakuraSiteInfo />
    <hr m="t-4 b-2" op="20">

    <SakuraSocialLinks />

    <SakuraSidebarItem :sidebar="sidebar" />

    <!-- <SakuraSidebarLinks /> -->
  </div>
</template>
~~~
