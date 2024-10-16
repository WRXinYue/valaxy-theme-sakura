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
  <button class="sakura-scroll-down" @click="toDown">
    <span :class="icon" class="sakura-scroll-down-icon animation-float inline-block" />
  </button>
</template>

<style lang="scss">
.sakura-scroll-down {
  &-icon {
    color: var(--sakura-bg-color);
    font-size: 28px;
    cursor: pointer;
  }
}
</style>
