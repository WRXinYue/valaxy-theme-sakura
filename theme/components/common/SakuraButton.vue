<script setup lang="ts">
withDefaults(defineProps<{
  type?: string
}>(), {
  type: 'primary',
})
</script>

<template>
  <button :class="type">
    <slot />
  </button>
</template>

<style lang="scss">
.primary {
  border-width: 1px;
  background-color: transparent;
  color: var(--st-c-text);
  border-radius: 20px;
  padding: 2px 20px;
  transition: color 0.3s ease-in-out, border-color 0.2s ease-in-out;

  &:hover, &.clicked {
    color: var(--st-c-secondary);
    border-color: var(--st-c-secondary);
  }

}
</style>
