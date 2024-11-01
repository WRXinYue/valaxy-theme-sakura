<script lang="ts" setup>
import * as addonAlgolia from 'valaxy-addon-algolia'
import { isEmptyAddon } from 'valaxy'
import { algoliaRef } from '../../plugins/algolia'

defineProps<{
  open: boolean
}>()

if (isEmptyAddon(addonAlgolia))
  throw new Error('valaxy-addon-algolia is not installed')

const { loaded, load, dispatchEvent } = addonAlgolia.useAddonAlgolia()

defineExpose({
  loaded,
  load,
  dispatchEvent,
})
</script>

<template>
  <AlgoliaSearchBox v-if="loaded" ref="algoliaRef" class="hidden" />
</template>
