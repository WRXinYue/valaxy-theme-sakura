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
    <SidebarThemeDynamic :sidebar="config.sidebar" />
  </SakuraSidebar>

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>

<style lang="scss">
// Reset style
.prose ol > li::before {
  display: none !important;
}
.prose ul > li {
  position: inherit !important;
}

.prose li {
  margin: 0 !important;
}
</style>
