<script setup lang="ts">
/**
 * Synchronized with:
 * https://github.com/YunYouJun/valaxy/blob/main/packages/valaxy/client/components/ValaxyApp.vue
 */

import { useLayout, useValaxyApp } from 'valaxy'
// @ts-expect-error virtual module
import ValaxyUserApp from '/@valaxyjs/UserAppVue'

const layout = useLayout()

if (layout.value !== 'empty') {
  useValaxyApp()
}
</script>

<template>
  <template v-if="layout !== 'empty'">
    <ValaxyThemeApp />
    <ValaxyAddons />
    <ValaxyUserApp />
  </template>
</template>
