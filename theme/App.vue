<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { onMounted } from 'vue'
import { useThemeConfig } from './composables'
import { useSakura } from './setup/themeStart'

const app = useAppStore()
const themeConfig = useThemeConfig()

onMounted(() => {
  app.showLoading = false

  useSakura(themeConfig.value)
})
</script>

<template>
  <Transition name="fade">
    <YunLoading v-if="app.showLoading" />
  </Transition>
</template>
