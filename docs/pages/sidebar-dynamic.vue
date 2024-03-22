<script lang="ts" setup>
import type { SidebarMulti } from 'valaxy-theme-sakura/types'
import { ref } from 'vue'

const sidebarDynamicConfig = ref<SidebarMulti>([
  'getting-started',
  'config',
  'theme',
  'components',
])

function handleDynamicConfigUpdate(newConfig: SidebarMulti) {
  sidebarDynamicConfig.value = newConfig
}
</script>

<template>
  <SakuraSidebar>
    <SidebarThemeDynamic :sidebar="sidebarDynamicConfig" />
  </SakuraSidebar>

  <div class="flex flex-col items-center justify-center h-100vh">
    <h2 class="text-5xl">
      Sidebar Dynamic 布局
    </h2>

    <CodeEditor class="md:w1/2 mt-20" :config="sidebarDynamicConfig" @update:config="handleDynamicConfigUpdate" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: playground
</route>
