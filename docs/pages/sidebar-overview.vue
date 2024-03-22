<script lang="ts" setup>
import type { NavItem } from 'valaxy-theme-sakura/types'
import { ref } from 'vue'

const sidebarOverviewConfig = ref<NavItem[]>([
  {
    text: '首页',
    icon: 'i-ri-home-4-line',
    link: '/',
  },
  {
    locale: 'menu.archives',
    icon: 'i-ri-archive-line',
    link: '/archives/',
  },
  {
    locale: 'menu.categories',
    icon: 'i-ri-folder-2-line',
    link: '/categories/',
  },
  {
    locale: 'menu.tags',
    icon: 'i-ri-price-tag-3-line',
    link: '/tags/',
  },
])

function handleOverviewConfigUpdate(newConfig: NavItem[]) {
  sidebarOverviewConfig.value = newConfig
}
</script>

<template>
  <SakuraSidebar>
    <SidebarThemeOverview :sidebar="sidebarOverviewConfig" />
  </SakuraSidebar>

  <div class="flex flex-col items-center justify-center h-100vh">
    <h2 class="text-5xl">
      Sidebar Overview 布局
    </h2>

    <CodeEditor class="md:w1/2 mt-20" :config="sidebarOverviewConfig" @update:config="handleOverviewConfigUpdate" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: playground
</route>
