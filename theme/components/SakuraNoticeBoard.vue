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

const noticeMessage = computed(() => props.text || themeConfig.value.notice?.message)
</script>

<template>
  <div v-if="noticeMessage" class="mb-5 mt-10 flex items-center border rounded-$st-c-rd border-dashed p-5">
    <div :class="icon" mr-2 />
    <div v-html="noticeMessage" />
  </div>
</template>
