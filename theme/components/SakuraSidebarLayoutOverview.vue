<script lang="ts" setup>
import type { NavItem } from '../types'

defineProps({
  sidebar: Array<NavItem>,
})
</script>

<template>
  <div class="sidebar-panel" p="2">
    <SakuraSiteInfo />
    <hr m="t-4 b-2" op="20">

    <SakuraSocialLinks />

    <SakuraSidebarItem :sidebar="sidebar" />

    <!-- <SakuraSidebarLinks /> -->
  </div>
</template>
