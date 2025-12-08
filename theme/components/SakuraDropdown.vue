<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  isShow?: boolean
  visible?: boolean
}>(), {
  isShow: true,
  visible: undefined,
})

const internalOpen = ref(false)
const isOpen = computed(() => props.visible !== undefined ? props.visible : internalOpen.value)

function handleMouseOver() {
  if (props.visible === undefined)
    internalOpen.value = true
}

function handleMouseLeave() {
  if (props.visible === undefined)
    internalOpen.value = false
}
</script>

<template>
  <div class="sakura-dropdown" :aria-haspopup="!!$slots.menu" :aria-expanded="isOpen" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
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
    left: 50%;
    transform: translateX(-50%) translateY(10px);
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
    transform: translateX(-50%) translateY(0);
  }

  &[aria-expanded='false'] .sakura-dropdown-menu {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(10px);
  }
}
</style>
