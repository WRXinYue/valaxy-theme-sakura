<script lang="ts" setup>
import { useThemeConfig } from 'valaxy'
import { ref } from 'vue'

const themeConfig = useThemeConfig() as any

const config = ref(
  {
    sidebar: themeConfig.value.sidebar,
  },
)

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <SakuraSidebar>
    <SidebarThemeDynamic :sidebar="config.sidebar" class="playground" />
  </SakuraSidebar>

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>
