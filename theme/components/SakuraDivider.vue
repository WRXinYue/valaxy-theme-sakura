<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  text: string
  divider?: boolean
}>(), {
  divider: true,
})
</script>

<template>
  <div class="sakura-divider flex items-center">
    <div :class="icon" class="sakura-divider-icon" />
    <span class="sakura-divider-text">
      {{ text }}
    </span>
  </div>
</template>

<style lang="scss">
.sakura-divider {
  padding-top: 24px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  color: var(--sakura-text-color);
  border-bottom: 1px dashed #ececec;

  &-icon {
    margin-right: 0.25rem;
  }
}
</style>
