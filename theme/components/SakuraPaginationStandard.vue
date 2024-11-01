<script setup lang="ts">
import { computed } from 'vue'
import { usePostList, useSiteConfig } from 'valaxy'
import { useSakuraAppStore } from '../stores'
import { useThemeConfig } from '../composables'

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
