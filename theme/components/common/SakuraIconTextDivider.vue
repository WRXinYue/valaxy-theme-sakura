<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  text: string
  divider?: boolean
}>(), {
  divider: true,
})
</script>

<template>
  <div class="flex items-center px-20px pt-24px text-$sakura-c-text">
    <div :class="icon" class="mr-1" /> {{ text }}
  </div>
  <hr v-if="divider">
</template>
