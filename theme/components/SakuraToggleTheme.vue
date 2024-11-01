<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from 'valaxy'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  darkIcon?: string
  lightIcon?: string
}>()

const themeConfig = useThemeConfig()
const appStore = useAppStore()

const darkIcon = computed(() => props.darkIcon || themeConfig.value.toggleThemeIcon?.darkIcon)
const lightIcon = computed(() => props.lightIcon || themeConfig.value.toggleThemeIcon?.lightIcon)
</script>

<template>
  <button class="sakura-icon-btn sakura-toggle-theme" type="button" aria-label="Toggle Dark Mode" @click="appStore.toggleDarkWithTransition">
    <div :class="appStore.isDark ? darkIcon : lightIcon" />
  </button>
</template>
