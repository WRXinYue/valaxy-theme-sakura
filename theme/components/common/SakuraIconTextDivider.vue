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
  <div class="pt-24px px-20px flex items-center text-$st-c-text">
    <div :class="icon" class="mr-1" /> {{ text }}
  </div>
  <hr v-if="divider">
</template>
