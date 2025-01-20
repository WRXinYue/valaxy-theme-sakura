<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  isShow?: boolean
}>(), {
  isShow: true,
})

const isOpen = ref(false)
</script>

<template>
  <div class="sakura-dropdown" :aria-haspopup="!!$slots.menu" :aria-expanded="isOpen" @mouseover="isOpen = true" @mouseleave="isOpen = false">
    <slot name="button" />
    <div v-if="isShow && $slots.menu" class="sakura-dropdown-menu">
      <slot name="menu" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sakura-dropdown {
  position: relative;
  display: inline-block;

  .sakura-dropdown-menu {
    position: absolute;
    z-index: 3;
    top: 100%;
    left: 0;
    background-color: var(--sakura-navbar-bg);
    border-radius: 4px;
    box-shadow: 0 8px 16px oklch(0% 0 0 / 20%);
    padding: 11px 8px;
    transition:
      background-color 0.5s,
      opacity 0.25s,
      visibility 0.25s,
      transform 0.25s;
  }

  &[aria-expanded='true'] .sakura-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &[aria-expanded='false'] .sakura-dropdown-menu {
    opacity: 0;
    visibility: hidden;
    transform: translateY(0);
  }
}
</style>
