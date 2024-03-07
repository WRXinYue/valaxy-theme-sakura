<script setup lang="ts">
import { isDark, toggleDark } from 'valaxy'
</script>

<template>
  <button type="button" aria-label="Toggle Dark Mode" @click="toggleDark()">
    <div v-if="!isDark" i-ri-sun-line />
    <div v-else i-ri-moon-line />
  </button>
</template>
