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
    <li v-for="(item, index) in items" :key="index">
      <SakuraSidebarLinkItem :key="index" :item="item" class="sakura-sidebar-link-item" />
      <SakuraSidebarLinkItem v-if="item.items" :items="item.items" class="sakura-sidebar-link-sub-items" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.sakura-sidebar-link-items {
  .sakura-sidebar-link-item {
    padding: 6px 15px;
    color: var(--sakura-text-deep-color);
    font-size: 14px;
    letter-spacing: 0.02em;

    &:hover {
      color: var(--sakura-primary-color);
    }
  }

  .sakura-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 6px;
  }
}

.sakura-sidebar-link-sub-items {
  padding-left: 20px;

  .sakura-sidebar-link-item {
    font-size: 13px;
    color: var(--sakura-text-muted-color);
  }

  .sakura-icon {
    width: 0.9rem;
    height: 0.9rem;
  }
}
</style>
