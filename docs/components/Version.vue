<script setup lang="ts">
import { version as SakuraVersion } from 'valaxy-theme-sakura/package.json'
import { version as ValaxyVersion } from 'valaxy/package.json'

defineProps<{
  type?: 'sakura' | 'valaxy'
}>()
</script>

<template>
  <template v-if="type === 'sakura'">
    {{ SakuraVersion }}
  </template>
  <template v-if="type === 'valaxy'">
    {{ ValaxyVersion }}
  </template>
</template>
