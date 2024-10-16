<script setup lang="ts">
import { useScroll } from '../composables'

const scroll = useScroll()
</script>

<template>
  <div class="sakura-scroll-indicator" :style="{ width: `${scroll.percentage.value * 100}%` }" />
</template>

<style lang="scss">
.sakura-scroll-indicator {
  z-index: 110;
  position: fixed;
  left: 0;
  top: 0;
  height: 3px;
  background: var(--sakura-primary-color);
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
