<script setup lang="ts">
import { computed } from 'vue'
import { useScroll, useThemeConfig } from '../composables'

const props = defineProps<{
  icon?: string
}>()

const themeConfig = useThemeConfig()
const { toDown } = useScroll()

const icon = computed(() => props.icon || themeConfig.value.scrollDown.icon)
</script>

<template>
  <i :class="icon" class="sakura-scroll-down animation-float inline-block cursor-pointer" @click="toDown" />
</template>

<style lang="scss">
.sakura-scroll-down {
  color: var(--sakura-bg-color);
  font-size: 28px;
}
</style>
