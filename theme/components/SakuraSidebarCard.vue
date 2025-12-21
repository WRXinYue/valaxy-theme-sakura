<script lang="ts" setup>
defineProps<{
  icon?: string
  title?: string
}>()
</script>

<template>
  <SakuraCard class="sakura-card sakura-sidebar-card">
    <div v-if="title || icon" class="sakura-sidebar-title">
      <span v-if="icon" :class="icon" mr-2 />
      {{ title }}
    </div>
    <slot />
  </SakuraCard>
</template>

<style lang="scss" scoped>
.sakura-sidebar-card {
  padding: 1.2rem;
  align-items: stretch;
  text-align: left;
}

.sakura-sidebar-title {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--sakura-color-divider);
}
</style>
