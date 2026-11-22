<script setup lang="ts">
import type { NavItem } from '../types'

const props = defineProps<Partial<NavItem>>()
</script>

<template>
  <div class="sakura-navbar-link-item">
    <SakuraNavLink v-bind="props" roll />
  </div>
</template>

<style lang="scss" scoped>
.sakura-navbar-link-item {
  display: flex;
  justify-content: center;
  font-size: 15px;
  color: inherit;
  margin-inline: 0.75rem;
}
</style>
