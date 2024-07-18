<script setup lang="ts">
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const props = withDefaults(defineProps<{
  icon?: string
  text?: string
}>(), {
  icon: 'i-fa6-solid:bullhorn',
})

const themeConfig = useThemeConfig()

const text = computed(() => props.text || themeConfig.value.noticeBoard?.message)
</script>

<template>
  <div v-if="text" class="mb-5 mt-10 flex items-center border rounded-$st-c-rd border-dashed p-5">
    <div :class="icon" mr-2 />
    <div v-html="text" />
  </div>
</template>
