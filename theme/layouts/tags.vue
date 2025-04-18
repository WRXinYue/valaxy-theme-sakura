<script setup lang="ts">
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org/vue'

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <SakuraTagsLayout />
</template>
