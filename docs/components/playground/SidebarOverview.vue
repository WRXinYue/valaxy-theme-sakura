<script lang="ts" setup>
import { ref } from 'vue'

const config = ref({
  sidebar: [
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
  ],
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <SakuraSidebar>
    <SidebarThemeOverview :sidebar="config.sidebar" />
  </SakuraSidebar>

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>
