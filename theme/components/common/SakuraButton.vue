<script setup lang="ts">
withDefaults(defineProps<{
  type?: string
}>(), {
  type: 'primary',
})
</script>

<template>
  <button class="sakura-button" :class="`sakura-button-${type}`">
    <slot />
  </button>
</template>

<style lang="scss">
.sakura-button {
  border-width: 1px;
  padding: 2px 20px;
  border-radius: 20px;
  color: var(--st-c-text);
  transition:
    color 0.3s ease-in-out,
    border-color 0.2s ease-in-out;

  &-primary {
    background-color: transparent;

    &:hover,
    &.clicked {
      color: var(--st-c-secondary);
      border-color: var(--st-c-secondary);
    }
  }
}
</style>
