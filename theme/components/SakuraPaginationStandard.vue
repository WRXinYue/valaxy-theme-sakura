<script setup lang="ts">
import { usePostList, useSiteConfig } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const props = defineProps<{
  pageSize?: number
  total?: number
}>()

const siteConfig = useSiteConfig()
const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()
const routes = usePostList({ type: '' })

const posts = computed(() => routes.value)
const curPage = computed(() => sakura.curPage || 1)
const pageSize = computed(() => props.pageSize || themeConfig.value.pagination?.itemsPerPage || siteConfig.value.pageSize)
</script>

<template>
  <ValaxyPagination :cur-page="curPage" :page-size="pageSize" :total="total || posts.length" />
</template>
