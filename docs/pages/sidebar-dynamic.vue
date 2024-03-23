<script lang="ts" setup>
import { ref } from 'vue'

const config = ref(
  {
    sidebar: [
      'getting-started',
      'config',
      'theme',
      'components',
    ],
  },
)

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <SakuraSidebar>
    <SidebarThemeDynamic :sidebar="config.sidebar" />
  </SakuraSidebar>

  <div class="flex flex-col items-center justify-center h-100vh">
    <h2 class="text-5xl">
      Sidebar Dynamic 布局
    </h2>

    <CodeEditor class="md:w1/2 mt-20" :config="config" @update:config="configUpdate" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: playground
</route>
