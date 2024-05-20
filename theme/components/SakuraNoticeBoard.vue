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
  <div v-if="text" class="border border-dashed rounded-$st-c-rd mt-10 mb-5 p-5 flex items-center">
    <div :class="icon" mr-2 />
    <div v-html="text" />
  </div>
</template>
