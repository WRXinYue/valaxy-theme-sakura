<script setup lang="ts">
import { computed } from 'vue'
import { useScroll, useThemeConfig } from '../composables'

const props = defineProps<{
  icon?: string
}>()

const themeConfig = useThemeConfig()
const { toDown } = useScroll()

const icon = computed(() => props.icon || themeConfig.value.ui.scrollDown.icon)
</script>

<template>
  <button class="sakura-scroll-down" @click="toDown">
    <span :class="icon" class="sakura-scroll-down-icon animation-float inline-block" />
  </button>
</template>

<style lang="scss" scoped>
.sakura-scroll-down {
  transform: scale(1.5, 1);

  &-icon {
    color: var(--sakura-color-background);
    font-size: 19px;
    cursor: pointer;
  }
}
</style>
