<script setup lang="ts">
defineProps<{
  demo: number
}>()
</script>

<template>
  <template v-if="demo === 0">
    <SakuraGlitchText text="Glitch text effect" />
  </template>

  <template v-else-if="demo === 1">
    <SakuraGlitchText type-string="Glitch text effect" loop :pause-for="600" :delete-all="50" />
  </template>
</template>
