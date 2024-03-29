<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SidebarItem } from '../types'
import { useSidebarControl } from '../composables/sidebar'

const props = defineProps<{
  item: SidebarItem
  depth: number
}>()

const { collapsed, toggle } = useSidebarControl(computed(() => props.item))

const { t } = useI18n()
</script>

<template>
  <li v-if="item.text && depth === 0" p="t-2" w="full" class="inline-flex items-center justify-between" :tabindex="item.items && 0">
    <span font="bold" m="l-1">
      {{ t(props.item.text || '') }}
    </span>
    <button
      tabindex="0" role="button" aria-label="toggle section"
      class="caret folder-action inline-flex cursor-pointer"
      @click="toggle"
    >
      <div v-if="collapsed" i-ri-folder-add-line />
      <div v-else i-ri-folder-reduce-line />
    </button>
  </li>

  <ul v-if="item.items" v-show="!collapsed" class="sakura-sidebar-section">
    <li v-for="sidebarItem in item.items" :key="sidebarItem.text" class="sakura-sidebar-item">
      <RouterLink v-if="sidebarItem.text" :to="sidebarItem.link || ''" class="sakura-sidebar-item-link inline-flex items-center" active-class="active">
        <span m="l-1" text="sm">{{ t(sidebarItem.text) }}</span>
      </RouterLink>

      <PressSidebarItem :depth="depth + 1" :item="sidebarItem" />
    </li>
  </ul>
</template>
