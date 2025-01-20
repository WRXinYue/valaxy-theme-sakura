<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { NavItem } from '../types'

const props = defineProps<Partial<NavItem>>()

const { t } = useI18n()

const text = computed(() => props.locale ? `${props.text ?? ''} ${t(props.locale)}` : props.text)
</script>

<template>
  <AppLink class="sakura-nav-link" :title="text" :to="link" :target rel="noopener" :class="animated">
    <span v-if="icon" :class="[icon]" inline-flex class="hvr-icon sakura-icon sakura-nav-link-icon mr-0.5" />
    <span v-if="text" truncate class="sakura-nav-link-text" :class="[{ '<lg:hidden': icon }]"> {{ text }} </span>
    <slot />
  </AppLink>
</template>

<style lang="scss" scoped>
.sakura-nav-link {
  display: flex;
  align-items: center;
  color: inherit;

  &:hover {
    color: var(--sakura-color-primary);
  }
}
</style>
