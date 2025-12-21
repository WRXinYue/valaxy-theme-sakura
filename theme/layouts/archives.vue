<script lang="ts" setup>
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org/vue'
import { useSiteStore } from 'valaxy'

const site = useSiteStore()

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <SakuraPage>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <SakuraTimeLine :posts="site.postList" />
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>
