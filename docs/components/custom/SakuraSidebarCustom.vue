<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <SakuraSidebar v-if="!isHome" :default-open="true" :show-hamburger="false" layout="top-left">
    <SidebarThemeDynamic />
  </SakuraSidebar>
</template>
