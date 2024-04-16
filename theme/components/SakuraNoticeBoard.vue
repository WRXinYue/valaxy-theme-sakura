<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  text?: string
}>(), {
  icon: 'i-fa6-solid:bullhorn',
  text: '这是一个公告组件',
})
</script>

<template>
  <div class="border border-dashed rounded-$st-c-rd mt-10 mb-5 p-5 flex items-center">
    <div :class="icon" mr-2 />
    <div>
      {{ text }}
    </div>
  </div>
</template>
