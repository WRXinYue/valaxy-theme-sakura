<script lang="ts" setup>
import { computed } from 'vue'
import type { NavItem } from '../../types'
import { useThemeConfig } from '../../composables'

const props = defineProps({
  sidebar: Array<NavItem>,
})

const themeConfig = useThemeConfig()

const sidebar = computed(() => props.sidebar || themeConfig.value.sidebar)
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
