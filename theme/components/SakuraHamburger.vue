<script setup lang="ts">
const props = defineProps<{
  active?: boolean
}>()
</script>

<template>
  <SakuraHamburgerUneven v-bind="props" />
</template>
