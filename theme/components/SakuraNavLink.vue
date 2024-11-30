<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { NavItem } from '../types'

defineProps<Partial<NavItem>>()

const { t } = useI18n()
</script>

<template>
  <AppLink class="sakura-nav-link" :title="locale ? `${text ?? ''} ${t(locale)}` : text" :to="link" :target rel="noopener" :class="animated">
    <span v-if="icon" :class="icon" inline-flex class="hvr-icon sakura-icon sakura-nav-link-icon mr-0.5" />
    <span v-if="locale || text" truncate class="sakura-nav-link-text"> {{ locale ? `${text ?? ''} ${t(locale)}` : text }} </span>
    <slot />
  </AppLink>
</template>

<style lang="scss">
.sakura-nav-link {
  display: flex;
  align-items: center;
}
</style>
