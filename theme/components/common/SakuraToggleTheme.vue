<script setup lang="ts">
import { useAppStore } from 'valaxy'

const appStore = useAppStore()
</script>

<template>
  <button type="button" aria-label="Toggle Dark Mode" @click="appStore.toggleDarkWithTransition">
    <div v-if="!appStore.isDark" i-ri-sun-line />
    <div v-else i-ri-moon-line />
  </button>
</template>
