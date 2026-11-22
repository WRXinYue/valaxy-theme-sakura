<script setup lang="ts">
import type { NavItem } from '../types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<Partial<NavItem> & {
  roll?: boolean
}>()

const { t } = useI18n()

const text = computed(() => props.locale
  ? `${props.text ?? ''} ${t(props.locale)}`
  : props.text)
</script>

<template>
  <AppLink class="sakura-nav-link" :title="text" :to="link" :target rel="noopener" :class="{ 'is-roll': roll }">
    <span v-if="icon" :class="[icon]" inline-flex class="hvr-icon sakura-icon sakura-nav-link-icon mr-0.5" />
    <span
      v-if="text"
      class="sakura-nav-link-text"
      :class="[{ '<lg:hidden': icon }, { 'is-roll': roll }, { truncate: !roll }]"
    >
      <span v-if="roll" class="sakura-nav-link-roll">
        <span class="sakura-nav-link-line">{{ text }}</span>
        <span class="sakura-nav-link-line" aria-hidden="true">{{ text }}</span>
      </span>
      <template v-else> {{ text }} </template>
    </span>
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

  &.is-roll:hover {
    color: inherit;
  }
}

.sakura-nav-link-text.is-roll {
  display: inline-block;
  overflow: hidden;
  height: 1.35em;
  line-height: 1.35;
  vertical-align: top;
}

.sakura-nav-link-roll {
  display: block;
  will-change: transform;
  transition: transform 0.28s cubic-bezier(0.19, 1, 0.22, 1);
}

.sakura-nav-link.is-roll:hover .sakura-nav-link-roll,
.sakura-nav-link.is-roll:focus-visible .sakura-nav-link-roll {
  transform: translateY(-50%);
}

.sakura-nav-link-line {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
