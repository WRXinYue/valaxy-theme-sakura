<script lang="ts" setup>
// No props needed for now
</script>

<template>
  <div class="sakura-loading flex-center flex-col py-4 text-center opacity-50">
    <div i-ri-loader-4-line class="mx-auto mb-2 animate-spin text-2xl text-[var(--sakura-color-primary)]" />
    <span class="text-sm">Loading...</span>
  </div>
</template>

<style lang="scss" scoped>
.sakura-loading {
  width: 100%;
  height: 100%;
}
</style>
