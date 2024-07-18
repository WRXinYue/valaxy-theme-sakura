<script setup lang="ts">
defineProps<{
  icon: string
  link: string
}>()
</script>

<template>
  <p class="text-4xl leading-0!">
    <a class="inline leading-0" :href="link" target="_blank" rel="noopener noreferrer">
      <div :class="icon" />
    </a>
  </p>
</template>
