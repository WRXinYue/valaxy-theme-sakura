<script setup lang="ts">
import { useAppStore } from 'valaxy'

withDefaults(defineProps<{
  darkIcon?: string
  lightIcon?: string
}>(), {
  darkIcon: 'i-ri-moon-line',
  lightIcon: 'i-ri-sun-line',
})

const appStore = useAppStore()
</script>

<template>
  <button type="button" aria-label="Toggle Dark Mode" @click="appStore.toggleDarkWithTransition">
    <div :class="appStore.isDark ? darkIcon : lightIcon" />
  </button>
</template>
