<script setup lang="ts">
import { useThemeConfig } from 'valaxy'
import { ref } from 'vue'

const themeConfig = useThemeConfig() as any

const config = ref({
  footer: themeConfig.value.footer,
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <SakuraFooter :footer="config.footer" />
  <CodeEditor :config="config" @update:config="configUpdate" />
</template>
