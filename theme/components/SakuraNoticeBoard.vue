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
  <div v-if="noticeMessage" m="b-5 t-10" p5 class="sakura-notice-board sakura-card" flex="~ items-center">
    <div class="notice-board-content relative transition-all duration-500 md:px-8 <md:pt-6">
      <span :class="icon" class="notice-icon absolute left-1 top-1.3 inline-block transition-all duration-500 <md:left-50% <md:top-0" />
      <span class="notice-message" v-html="noticeMessage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sakura-notice-board {
  width: 100%;
  background: var(--sakura-card-bg);
  color: var(--font-color);
  cursor: pointer;
}
</style>
