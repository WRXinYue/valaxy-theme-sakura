<script lang="ts" setup>
defineProps<{
  date: Date | number | string
}>()
</script>

<template>
  <div class="sakura-post-date">
    <AppLink class="inline-flex items-center align-top">
      <span i-mdi:clock-outline class="sakura-icon mr-1 inline-block" /> 发布于
      <SakuraDate :date="date" class="inline-block" />
    </AppLink>
  </div>
</template>
