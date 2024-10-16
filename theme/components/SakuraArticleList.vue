<script setup lang="ts">
import { computed } from 'vue'
import { useThemeConfig } from '../composables'
import type { ArticleList } from '../types'

const props = defineProps<Partial<ArticleList>>()

const themeConfig = useThemeConfig()

const icon = computed(() => props.icon ?? themeConfig.value.articleList?.icon)
const text = computed(() => props.text ?? themeConfig.value.articleList?.text)
</script>

<template>
  <div class="sakura-article-list">
    <SakuraDivider :icon :text />
    <SakuraArticleListCard />
  </div>
</template>
