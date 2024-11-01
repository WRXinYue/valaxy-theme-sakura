<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { computed, defineAsyncComponent } from 'vue'
import { useSearch } from '../composables'

const siteConfig = useSiteConfig()
const search = useSearch()

const isAlgolia = computed(() => siteConfig.value.search.type === 'algolia')
const isFuse = computed(() => siteConfig.value.search.type === 'fuse')

const SakuraAlgoliaSearch = isAlgolia.value && defineAsyncComponent({
  loader: () => import('./plugins/SakuraAlgoliaSearch.vue'),
  errorComponent: import('./SakuraSearch.vue'),
})
</script>

<template>
  <SakuraSearchBtn :open="search.isOpen && !isAlgolia" @open="search.open" @close="search.close" />

  <SakuraAlgoliaSearch v-if="isAlgolia" :open="search.isOpen" @close="search.close" />
  <SakuraSearch v-else-if="isFuse" :open="search.isOpen" @close="search.close" />
</template>
