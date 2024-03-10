<script lang="ts" setup>
import type { NavItem, SidebarMulti } from 'valaxy-theme-sakura/types'
import { ref } from 'vue'

const sidebarDynamicConfig = ref<SidebarMulti>([
  'getting-started',
  'config',
  'theme',
  'components',
])

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

function handleDynamicConfigUpdate(newConfig: SidebarMulti) {
  sidebarDynamicConfig.value = newConfig
}
function handleOverviewConfigUpdate(newConfig: NavItem[]) {
  sidebarOverviewConfig.value = newConfig
}
</script>

<template>
  <div flex md:justify-around>
    <div>
      <h4>Sidebar Dynamic 布局</h4>
      <SakuraSidebar :fixed="false" :layout="{ sidebar: 'dynamic' }" :sidebar="sidebarDynamicConfig" />
    </div>
    <div>
      <h4>Sidebar Overview 布局</h4>
      <SakuraSidebar :fixed="false" :layout="{ sidebar: 'overview' }" :sidebar="sidebarOverviewConfig" />
    </div>
  </div>
  <div md:flex w-full>
    <CodeEditor class="md:w1/2" :config="sidebarDynamicConfig" @update:config="handleDynamicConfigUpdate" />
    <CodeEditor class="md:w1/2" :config="sidebarOverviewConfig" @update:config="handleOverviewConfigUpdate" />
  </div>
</template>
