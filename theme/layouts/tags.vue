<script setup lang="ts">
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org'

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <SakuraTagsLayout />
</template>
