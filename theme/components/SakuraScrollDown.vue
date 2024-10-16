<script setup lang="ts">
import { useScroll } from '../composables'

const { toDown } = useScroll()
</script>

<template>
  <i i-fa6-solid-angle-down class="sakura-scroll-down animation-float inline-block cursor-pointer" @click="toDown" />
</template>

<style lang="scss">
.sakura-scroll-down {
  color: var(--sakura-bg-color);
  font-size: 28px;
}
</style>
