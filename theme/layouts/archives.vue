<script lang="ts" setup>
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org'

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <Layout>
    <ArchivesThemeSakura />
  </Layout>
</template>
