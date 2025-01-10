<script setup lang="ts">
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  icon?: string
  message?: string
}>()

const themeConfig = useThemeConfig()

const noticeMessage = computed(() => props.message || themeConfig.value.notice?.message)
const icon = computed(() => props.icon || themeConfig.value.ui.notice?.icon)
</script>

<template>
  <div v-if="noticeMessage" class="mb-5 mt-10 border rounded-$sakura-border-radius border-dashed p-5" flex="~ <md:col items-center">
    <span :class="icon" mr-2 class="inline-block <md:mb-2" />
    <span v-html="noticeMessage" />
  </div>
</template>
