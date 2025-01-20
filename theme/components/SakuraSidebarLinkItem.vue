<script lang="ts" setup>
import type { NavItem } from '../types'

defineProps<{
  items?: Partial<NavItem>[]
  item?: Partial<NavItem>
}>()
</script>

<template>
  <SakuraNavLink v-if="item" v-bind="item">
    <SakuraSidebarCount :locale="item.locale" />
  </SakuraNavLink>

  <ul v-else-if="items?.length" class="sakura-sidebar-link-items">
    <li v-for="(_item, index) in items" :key="index">
      <SakuraSidebarLinkItem :key="index" :item="item" class="sakura-sidebar-link-item" />
      <SakuraSidebarLinkItem v-if="_item.items" :items="_item.items" class="sakura-sidebar-link-sub-items" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.sakura-sidebar-link-items {
  .sakura-sidebar-link-item {
    padding: 6px 15px;
    color: var(--sakura-color-text);
    font-size: 14px;
    letter-spacing: 0.02em;

    &:hover {
      color: var(--sakura-color-primary);
    }
  }

  .sakura-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 6px;
  }

  .sakura-sidebar-link-sub-items {
    padding-left: 20px;

    .sakura-sidebar-link-item {
      font-size: 13px;
      color: var(--sakura-color-text);
    }

    .sakura-icon {
      width: 0.9rem;
      height: 0.9rem;
    }
  }
}
</style>
